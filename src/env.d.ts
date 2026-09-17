/// <reference types="vite/client" />

/**
 * Переменные окружения, которые попадают в клиентский бандл.
 *
 * Vite по умолчанию отдаёт в браузер только переменные с префиксом `VITE_`,
 * поэтому `CONTACTS_` добавлен в `envPrefix` в vite.config.ts.
 * Секретов здесь быть не может: всё, что сюда попадёт, уедет в сборку.
 */
interface ImportMetaEnv {
  readonly CONTACTS_NAME?: string;
  readonly CONTACTS_CALLSIGN?: string;
  readonly CONTACTS_EMAIL?: string;
  readonly CONTACTS_PHONE?: string;
  readonly CONTACTS_TELEGRAM?: string;
  readonly CONTACTS_MAX?: string;
}
