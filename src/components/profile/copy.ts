import { notifications } from '@mantine/notifications';

/**
 * Копирование значения в буфер обмена.
 *
 * Копирование доступно не всегда: в незащищённом контексте и при запрете
 * браузера промис отклоняется. Это не ошибка страницы — просто значок ничего
 * не скопирует, поэтому исключение гасим молча, а плашку показываем только
 * после удачного копирования.
 */
export async function copyValue(value: string, label: string) {
  try {
    await navigator.clipboard.writeText(value);
    notifications.show({ message: `${label}: скопировано` });
  } catch {
    /* Буфер обмена недоступен: сообщать об этом нечего */
  }
}
