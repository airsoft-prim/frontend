/**
 * Применяет цветовую схему до первой отрисовки: без этого тёмная тема
 * на мгновение мигает светлым фоном.
 *
 * Подключается блокирующим <script> в <head> каждой страницы. Схема лежит
 * в cookie (см. src/theme/color-scheme-manager.ts) — здесь она читается
 * напрямую, потому что до React никакого менеджера ещё нет.
 */
(function () {
  try {
    var found = document.cookie.match(
      /(?:^|;\s*)mantine-color-scheme-value=([^;]*)/
    );
    var stored = found ? found[1] : null;
    var scheme =
      stored === 'light' || stored === 'dark' || stored === 'auto'
        ? stored
        : 'dark';
    var computed =
      scheme !== 'auto'
        ? scheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    document.documentElement.setAttribute(
      'data-mantine-color-scheme',
      computed
    );
  } catch {
    // Cookie недоступны — остаётся схема из атрибута в разметке
  }
})();
