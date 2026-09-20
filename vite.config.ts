import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import {
  defineConfig,
  normalizePath,
  type Connect,
  type Logger,
  type Plugin,
} from 'vite';

/**
 * Корень сайта — не страница, а вход в приложение: он уводит на /games/.
 * В продакшене этот редирект отдаёт веб-сервер (nginx: `location = / { return
 * 301 /games/; }`) — так клиент получает настоящий 301 без лишнего документа.
 * В dev и preview сервера нет, поэтому повторяем правило здесь, чтобы
 * локальные адреса совпадали с боевыми.
 */
const ROOT_REDIRECT = '/games/';

/**
 * Исходники страниц лежат в html/: корень проекта читается как проект, а не
 * как список разделов сайта. Каталог внутри html/ задаёт адрес страницы —
 * html/games/index.html отвечает на /games/.
 *
 * Сборка кладёт страницы в корень dist (плагин flattenPages), а dev-сервер
 * переводит адрес в путь внутри html/ (плагин mpaRouting): адреса разделов
 * не должны зависеть от того, где лежат исходники.
 */
const PAGES_DIR = 'html';

/** Файл страницы по адресу: /games/ -> <root>/<prefix>/games/index.html */
function pageFile(rootPath: string, prefix: string, pathname: string) {
  // Пути сравниваем в одном формате: Vite нормализует root прямыми слешами,
  // а path.resolve на Windows возвращает обратные.
  return normalizePath(resolve(rootPath, prefix, `.${pathname}/index.html`));
}

/**
 * Правила адресов: `/` уводит на /games/, `/games` — на `/games/`, а в dev
 * страницы отдаются из html/.
 *
 * Редирект со `/` в продакшене отдаёт веб-сервер (nginx: `location = / { return
 * 301 /games/; }`) — так клиент получает настоящий 301 без лишнего документа.
 * Вариант без слеша статический хостинг нормализует сам (nginx и Apache
 * добавляют слеш к каталогу), а dev-сервер отдал бы 404. Повторяем оба правила
 * локально, чтобы адреса совпадали с боевыми.
 */
function mpaRouting(): Plugin {
  const createMiddleware =
    (rootPath: string, prefix: string): Connect.NextHandleFunction =>
    (request, response, next) => {
      const [pathname, query] = (request.url ?? '').split('?');

      if (!pathname) {
        next();
        return;
      }

      if (pathname === '/') {
        response.writeHead(301, { Location: ROOT_REDIRECT });
        response.end();
        return;
      }

      /* Профиль игрока: /users/{hex} отдаёт ту же страницу, что и /me/.
         Принимаем любой 32-значный hex без проверки существования игрока —
         валидация появится вместе с API. Адрес переводим в /me/: в dev страница
         лежит в html/me/index.html, в собранном сайте — в dist/me/index.html.
         Адрес в браузере не меняется, поэтому страница читает hex
         из window.location.pathname. */
      if (/^\/users\/[0-9a-f]{32}\/?$/i.test(pathname)) {
        request.url = `${prefix ? `/${prefix}` : ''}/me/${
          query ? `?${query}` : ''
        }`;
        next();
        return;
      }

      /* Адресуют либо раздел (/games/), либо сам файл страницы
         (/games/index.html) — это одна и та же страница */
      const pointsToFile = pathname.endsWith('/index.html');
      const section = pointsToFile
        ? pathname.slice(0, -'index.html'.length)
        : pathname;
      const indexFile = pageFile(rootPath, prefix, section);
      const isPage = indexFile.startsWith(rootPath) && existsSync(indexFile);

      if (!pointsToFile && !pathname.endsWith('/')) {
        if (!isPage) {
          next();
          return;
        }

        response.writeHead(301, { Location: `${pathname}/` });
        response.end();
        return;
      }

      // В собранном сайте страницы уже лежат по своим адресам — переводить нечего
      if (prefix && isPage) {
        request.url = `/${prefix}${pathname}${query ? `?${query}` : ''}`;
      }

      next();
    };

  return {
    name: 'mpa-routing',
    configureServer(server) {
      server.middlewares.use(
        createMiddleware(normalizePath(server.config.root), PAGES_DIR)
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use(
        createMiddleware(
          normalizePath(resolve(server.config.root, server.config.build.outDir)),
          ''
        )
      );
    },
  };
}

/**
 * Сборка кладёт страницы в dist/html/<раздел>/index.html — так выходит из пути
 * исходников. Переносим их в корень сборки: адреса разделов остаются прежними
 * (/games/, а не /html/games/).
 *
 * Переносим файлы после записи, а не переименовываем в generateBundle: Rolldown
 * (сборщик Vite 8) правку объекта bundle не поддерживает — присваивание в него
 * игнорируется. Отчёт сборки печатает имена до переноса, поэтому сам перенос
 * отмечаем в логе строкой.
 */
function flattenPages(): Plugin {
  let logger: Logger | undefined;

  return {
    name: 'flatten-pages',
    enforce: 'post',
    configResolved(config) {
      logger = config.logger;
    },
    writeBundle(options) {
      const outDir = options.dir;

      if (!outDir) {
        this.error('Неизвестен каталог сборки — страницы некуда переносить');
      }

      const from = resolve(outDir, PAGES_DIR);

      if (!existsSync(from)) {
        return;
      }

      const moved = readdirSync(from);

      for (const entry of moved) {
        renameSync(resolve(from, entry), resolve(outDir, entry));
      }

      rmSync(from, { recursive: true, force: true });
      logger?.info(
        `страницы перенесены из ${PAGES_DIR}/ в корень сборки: ${moved.join(', ')}`
      );
    },
  };
}

/**
 * Проект собирается как MPA: каждая страница — отдельный HTML-вход со своей
 * точкой монтирования. Новый раздел = новый каталог в html/ и запись
 * в input ниже. Корневого index.html нет: `/` — это редирект.
 */
export default defineConfig({
  appType: 'mpa',
  plugins: [react(), mpaRouting(), flattenPages()],

  /**
   * Vite отдаёт в клиентский код только переменные с префиксом `VITE_`.
   * Контакты лежат в CONTACTS_* (см. .env.example) — разрешаем и этот префикс.
   * Всё перечисленное здесь попадает в сборку и видно в исходниках страницы,
   * поэтому секретов в этих переменных быть не должно.
   */
  envPrefix: ['VITE_', 'CONTACTS_'],

  /**
   * По умолчанию Vite слушает `localhost`, а Node на Windows резолвит его
   * в ::1 — сервер поднимается только на IPv6, и браузер по 127.0.0.1
   * получает «страница недоступна». Слушаем все адреса: `localhost`,
   * `127.0.0.1` и `[::1]` работают одинаково.
   *
   * strictPort: true — если порт занят, Vite падает с явной ошибкой,
   * а не переезжает молча на 5174, оставляя вас со старым адресом
   * в браузере.
   */
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },

  build: {
    rollupOptions: {
      input: {
        /* Разделы портала */
        games: resolve(import.meta.dirname, `${PAGES_DIR}/games/index.html`),
        committees: resolve(
          import.meta.dirname,
          `${PAGES_DIR}/committees/index.html`
        ),
        teams: resolve(import.meta.dirname, `${PAGES_DIR}/teams/index.html`),
        users: resolve(import.meta.dirname, `${PAGES_DIR}/users/index.html`),
        me: resolve(import.meta.dirname, `${PAGES_DIR}/me/index.html`),
        feed: resolve(import.meta.dirname, `${PAGES_DIR}/feed/index.html`),

        /* Документы и служебные страницы */
        agreement: resolve(
          import.meta.dirname,
          `${PAGES_DIR}/agreement/index.html`
        ),
        rules: resolve(import.meta.dirname, `${PAGES_DIR}/rules/index.html`),
        policy: resolve(import.meta.dirname, `${PAGES_DIR}/policy/index.html`),
        'design-example': resolve(
          import.meta.dirname,
          `${PAGES_DIR}/design-example/index.html`
        ),
      },
    },
  },
});
