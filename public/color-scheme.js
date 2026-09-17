/**
 * Применяет цветовую схему до первой отрисовки: без этого тёмная тема
 * на мгновение мигает светлым фоном.
 *
 * Подключается блокирующим <script> в <head> обеих страниц. Тело совпадает
 * с тем, что рендерит ColorSchemeScript из @mantine/core, но выполняется
 * раньше, чем React успевает смонтироваться.
 */
(function () {
  try {
    var stored = window.localStorage.getItem('mantine-color-scheme-value');
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
    // Приватный режим без localStorage — остаётся схема из атрибута в разметке
  }
})();
