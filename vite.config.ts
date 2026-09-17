import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import {
  defineConfig,
  normalizePath,
  type Connect,
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
 * Страница в каталоге живёт по адресу /games/, а вариант без слеша dev-сервер
 * отдаёт как 404. Статический хостинг нормализует это сам (nginx и Apache
 * добавляют слеш к каталогу), поэтому повторяем поведение локально.
 */
function mpaRedirects(): Plugin {
  const createMiddleware =
    (rootPath: string): Connect.NextHandleFunction =>
    (request, response, next) => {
      const [pathname] = (request.url ?? '').split('?');

      if (!pathname) {
        next();
        return;
      }

      if (pathname === '/') {
        response.writeHead(301, { Location: ROOT_REDIRECT });
        response.end();
        return;
      }

      if (pathname.endsWith('/')) {
        next();
        return;
      }

      // Пути сравниваем в одном формате: Vite нормализует root прямыми слешами,
      // а path.resolve на Windows возвращает обратные.
      const indexFile = normalizePath(
        resolve(rootPath, `.${pathname}/index.html`)
      );

      if (!indexFile.startsWith(rootPath) || !existsSync(indexFile)) {
        next();
        return;
      }

      response.writeHead(301, { Location: `${pathname}/` });
      response.end();
    };

  return {
    name: 'mpa-redirects',
    configureServer(server) {
      server.middlewares.use(createMiddleware(normalizePath(server.config.root)));
    },
    configurePreviewServer(server) {
      server.middlewares.use(
        createMiddleware(
          normalizePath(resolve(server.config.root, server.config.build.outDir))
        )
      );
    },
  };
}

/**
 * Проект собирается как MPA: каждая страница — отдельный HTML-вход со своей
 * точкой монтирования. Новый раздел = новый каталог с index.html и запись
 * в input ниже. Корневой index.html не собирается: `/` — это редирект.
 */
export default defineConfig({
  appType: 'mpa',
  plugins: [react(), mpaRedirects()],

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
        games: resolve(import.meta.dirname, 'games/index.html'),
        committees: resolve(import.meta.dirname, 'committees/index.html'),
        teams: resolve(import.meta.dirname, 'teams/index.html'),
        users: resolve(import.meta.dirname, 'users/index.html'),

        /* Документы и служебные страницы */
        agreement: resolve(import.meta.dirname, 'agreement/index.html'),
        policy: resolve(import.meta.dirname, 'policy/index.html'),
        'design-example': resolve(
          import.meta.dirname,
          'design-example/index.html'
        ),
      },
    },
  },
});
