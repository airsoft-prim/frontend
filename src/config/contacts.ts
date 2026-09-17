/**
 * Публичные контакты администрации — единственное место, где читаются
 * переменные окружения `CONTACTS_*` (см. .env.example). Значения попадают
 * в клиентскую сборку, поэтому секретов здесь быть не может.
 *
 * Позывной (`CONTACTS_CALLSIGN`) используется дважды: строкой «Позывной»
 * в окне контактов и подписью «Made by …» в футере.
 */

/**
 * Заглушки на случай, если .env не заполнен: интерфейс не должен оставаться
 * пустым во время разработки. Значения очевидно ненастоящие.
 */
const DEFAULTS = {
  name: 'Вася Пупкин',
  callsign: 'Pupkin',
  email: 'vasya.pupkin@example.com',
  phone: '+7 (000) 000-00-00',
  telegram: '@pupkin',
};

/* import.meta.env заполняет Vite; проверка на undefined нужна, чтобы модуль
 * можно было использовать вне Vite (например, в проверках). */
const env = (import.meta.env ?? {}) as ImportMetaEnv;

export const name = env.CONTACTS_NAME || DEFAULTS.name;
export const callsign = env.CONTACTS_CALLSIGN || DEFAULTS.callsign;
export const email = env.CONTACTS_EMAIL || DEFAULTS.email;
export const phone = env.CONTACTS_PHONE || DEFAULTS.phone;
export const telegram = env.CONTACTS_TELEGRAM || DEFAULTS.telegram;

/** Необязательный адрес профиля MAX: если пусто, строка не показывается */
export const max = env.CONTACTS_MAX || '';
