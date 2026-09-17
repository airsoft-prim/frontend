import type { MantineColorScheme, MantineColorSchemeManager } from '@mantine/core';

/**
 * Хранилище схемы — cookie, а не localStorage: cookie уходит на сервер с каждым
 * запросом, поэтому тему пользователя видно и вне браузера.
 *
 * Имя совпадает с прежним ключом localStorage: его же читает
 * public/color-scheme.js, чтобы схема применялась до первой отрисовки
 * и тёмная тема не мигала светлым фоном при загрузке.
 */
const COOKIE_NAME = 'mantine-color-scheme-value';

/** Год: выбор темы не должен теряться */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * `path=/` обязателен: портал собран из отдельных страниц (MPA), и cookie,
 * выданная на /games/, не была бы видна на /teams/.
 */
const COOKIE_ATTRIBUTES = `path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;

function isScheme(value: string | null): value is MantineColorScheme {
  return value === 'light' || value === 'dark' || value === 'auto';
}

function readCookie(): string | null {
  const prefix = `${COOKIE_NAME}=`;

  for (const row of document.cookie.split(';')) {
    const trimmed = row.trim();

    if (trimmed.startsWith(prefix)) {
      return trimmed.slice(prefix.length);
    }
  }

  return null;
}

export const colorSchemeManager: MantineColorSchemeManager = {
  get: (defaultValue) => {
    if (typeof document === 'undefined') {
      return defaultValue;
    }

    const stored = readCookie();
    return isScheme(stored) ? stored : defaultValue;
  },

  set: (value) => {
    document.cookie = `${COOKIE_NAME}=${value}; ${COOKIE_ATTRIBUTES}`;
  },

  /* У cookie нет события об изменении, как у localStorage: подписка нужна
     интерфейсу менеджера, но сообщать не о чем — схему меняет только эта вкладка */
  subscribe: () => {},
  unsubscribe: () => {},

  clear: () => {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  },
};
