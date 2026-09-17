import {
  defaultCssVariablesResolver,
  rgba,
  type CSSVariablesResolver,
} from '@mantine/core';

import { BRAND_COLOR_NAMES } from './colors';

/**
 * Связка «токены DESIGN.md → семантические переменные Mantine».
 *
 * Mantine отдаёт свои переменные двумя слоями: статические значения по умолчанию
 * из @mantine/core/styles.css и сгенерированные из темы (этот резолвер).
 * Сгенерированные применяются позже, поэтому переопределение здесь надёжнее,
 * чем ручные правила в CSS поверх хешированных классов компонентов.
 *
 * Мы наследуем базовый резолвер и меняем только те имена, за которыми в DESIGN.md
 * закреплён конкретный смысл.
 */
export const cssVariablesResolver: CSSVariablesResolver = (theme) => {
  const base = defaultCssVariablesResolver(theme);

  const light: Record<string, string> = {
    '--mantine-color-body': 'var(--sf-background)',
    '--mantine-color-bright': 'var(--sf-text-primary)',
    '--mantine-color-text': 'var(--sf-text-primary)',
    '--mantine-color-dimmed': 'var(--sf-text-muted)',
    '--mantine-color-placeholder': 'var(--sf-text-muted)',

    '--mantine-color-default': 'var(--sf-surface-elevated)',
    '--mantine-color-default-hover': 'var(--sf-surface)',
    '--mantine-color-default-color': 'var(--sf-text-primary)',
    '--mantine-color-default-border': 'var(--sf-border)',

    '--mantine-color-disabled': 'var(--sf-surface-hover)',
    '--mantine-color-disabled-color': 'var(--sf-text-muted)',
    '--mantine-color-disabled-border': 'var(--sf-border)',

    /* Ссылки и акценты: основной слот 6 не даёт 4.5:1 на тёплой подложке,
     * поэтому текстовый акцент светлой схемы — на шаг глубже */
    '--mantine-color-anchor': 'var(--mantine-color-field-7)',
    '--mantine-color-error': 'var(--mantine-color-danger-7)',
    '--mantine-color-success': 'var(--mantine-color-success-7)',
  };

  const dark: Record<string, string> = {
    '--mantine-color-body': 'var(--sf-background)',
    '--mantine-color-bright': 'var(--sf-text-primary)',
    '--mantine-color-text': 'var(--sf-text-primary)',
    '--mantine-color-dimmed': 'var(--sf-text-muted)',
    '--mantine-color-placeholder': 'var(--sf-text-muted)',

    '--mantine-color-default': 'var(--sf-surface)',
    '--mantine-color-default-hover': 'var(--sf-surface-hover)',
    '--mantine-color-default-color': 'var(--sf-text-primary)',
    '--mantine-color-default-border': 'var(--sf-border)',

    '--mantine-color-disabled': 'var(--sf-surface)',
    '--mantine-color-disabled-color': 'var(--sf-text-muted)',
    '--mantine-color-disabled-border': 'var(--sf-border)',

    '--mantine-color-anchor': 'var(--mantine-color-field-4)',
    '--mantine-color-error': 'var(--mantine-color-danger-4)',
    '--mantine-color-success': 'var(--mantine-color-success-4)',
  };

  BRAND_COLOR_NAMES.forEach((name) => {
    const shade6 = theme.colors[name][6];
    const shade4 = theme.colors[name][4];

    /* В тёмной схеме Mantine строит «light»-вариант как darken(shade9, .5) —
     * это почти чёрная подложка, которая сливается с фоном приложения.
     * Заменяем на полупрозрачный тон бренда: он читается на любой поверхности. */
    dark[`--mantine-color-${name}-light`] = rgba(shade6, 0.18);
    dark[`--mantine-color-${name}-light-hover`] = rgba(shade6, 0.28);
    dark[`--mantine-color-${name}-light-color`] = `var(--mantine-color-${name}-3)`;
    dark[`--mantine-color-${name}-outline`] = `var(--mantine-color-${name}-4)`;
    dark[`--mantine-color-${name}-outline-hover`] = rgba(shade4, 0.08);

    /* В светлой схеме слот 1 слишком близок к песочной поверхности и не читается
     * как статус. Ставим тот же приём, что и в тёмной: прозрачный тон бренда.
     * Прозрачность 0.18 / 0.24 подобрана так, чтобы текст shade 9 держал 4.5:1
     * и в обычном, и в наведённом состоянии. */
    light[`--mantine-color-${name}-light`] = rgba(shade6, 0.18);
    light[`--mantine-color-${name}-light-hover`] = rgba(shade6, 0.24);
    light[`--mantine-color-${name}-outline`] = `var(--mantine-color-${name}-7)`;
  });

  return {
    variables: base.variables,
    light: { ...base.light, ...light },
    dark: { ...base.dark, ...dark },
  };
};
