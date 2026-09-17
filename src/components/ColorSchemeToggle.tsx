import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons-react';

/**
 * Переключение Dark Field / Sand Field. Схема хранится средствами Mantine
 * в localStorage, поэтому выбор переживает переход между страницами MPA.
 *
 * Смена схемы идёт плавно: на время перехода на <html> появляется класс
 * sf-theme-transition, и цвета перетекают друг в друга (стили — в
 * src/styles/global.css). Класс живёт только на время переключения: постоянные
 * transition-ы на всех элементах тормозят отрисовку и оживляют загрузку.
 *
 * keepTransitions здесь обязателен: по умолчанию Mantine на каждый setColorScheme
 * вставляет style с `*, ::before, ::after { transition: none !important }` и снимает
 * его через 10 мс — чтобы смена схемы нигде не анимировалась. Если браузер
 * в эти 10 мс пересчитывает стили (наведение, фокус, тултип — всё, что есть при
 * настоящем клике мышью), цвета успевают смениться под запретом переходов,
 * и на экране виден рывок. Опция отключает эту заглушку.
 */

/** Длительность совпадает с --sf-transition-theme в src/styles/tokens.css */
const TRANSITION_MS = 240;

/** Запас к длительности: таймер и переход идут по разным часам */
const CLEANUP_DELAY_MS = TRANSITION_MS + 80;

const TRANSITION_CLASS = 'sf-theme-transition';

type Scheme = 'light' | 'dark';

let cleanupTimer: number | undefined;

/**
 * Схема берётся из атрибута на <html>: это то, что видно на экране. Значение
 * из замыкания к моменту применения уже могло устареть — при двух кликах
 * подряд переключение идёт от того, что успело отрисоваться.
 */
function nextScheme(): Scheme {
  return document.documentElement.getAttribute('data-mantine-color-scheme') === 'dark'
    ? 'light'
    : 'dark';
}

/** Включает переход на время смены схемы и снимает его, когда переход прошёл */
function startSchemeTransition() {
  const root = document.documentElement;

  root.classList.add(TRANSITION_CLASS);
  window.clearTimeout(cleanupTimer);
  cleanupTimer = window.setTimeout(() => {
    root.classList.remove(TRANSITION_CLASS);
  }, CLEANUP_DELAY_MS);
}

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computed = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });
  const reduceMotion = useReducedMotion();
  const isDark = computed === 'dark';

  return (
    <Tooltip label={isDark ? 'Светлая схема' : 'Тёмная схема'}>
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="Переключить цветовую схему"
        onClick={() => {
          /* При отключённых анимациях (prefers-reduced-motion) схема меняется
             сразу: переход в этом случае только мешает */
          if (!reduceMotion) {
            startSchemeTransition();
          }

          setColorScheme(nextScheme());
        }}
      >
        {/* Иконки лежат друг на друге и меняются местами поворотом: видно,
            что нажатие сработало, но кнопка не «прыгает» между состояниями */}
        <span className="sf-scheme-icon" aria-hidden>
          <IconSun className="sf-scheme-icon-sun" size={20} stroke={1.6} />
          <IconMoon className="sf-scheme-icon-moon" size={20} stroke={1.6} />
        </span>
      </ActionIcon>
    </Tooltip>
  );
}
