import { createTheme } from '@mantine/core';

import { colors } from './colors';

/**
 * Тема Mantine по docs/DESIGN.md.
 *
 * Здесь только то, что Mantine умеет выразить через конфигурацию: палитры,
 * радиусы, типографика и умолчания компонентов. Значения поверхностей, границ
 * и текста живут в CSS-токенах (src/styles/tokens.css) и связываются
 * с семантическими переменными Mantine в css-variables-resolver.ts.
 */
export const theme = createTheme({
  colors,

  primaryColor: 'field',
  /* Одна и та же «Field Olive» как основное действие в обеих схемах */
  primaryShade: 6,

  /* Бейджи и кнопки на светлых брендовых заливках (Sand, Warning, Success, Rust)
   * получают тёмный текст: контраст белого по ним 2.6–4.1 и не проходит AA,
   * а по Field, Steel и Danger — проходит, поэтому порог 0.2. */
  autoContrast: true,
  luminanceThreshold: 0.2,
  /* Чистый чёрный запрещён дизайн-системой: используем тёплые чернила */
  black: '#16180F',

  fontFamily: 'var(--sf-font-sans)',
  fontFamilyMonospace: 'var(--sf-font-mono)',

  /* Умеренное скругление. Шкала целиком: Mantine отдаёт переменные только
   * для перечисленных ступеней, и без xs/xl они пропали бы из темы.
   * sm/md/lg совпадают с токенами (--sf-radius-sm 4px / --sf-radius 8px /
   * --sf-radius-lg 12px), xs/xl сохраняют дефолтные 2px и 32px */
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '2rem',
  },
  defaultRadius: 'md',

  respectReducedMotion: true,

  /* Типографика на шаг крупнее дефолтной: служебные подписи и строки
   * интерфейса заданы через `size="xs"` и `sm`, а дефолтные 12 и 14px
   * на плотных паллетках читаются мелко.
   * `xxl` — шаг для крупных чисел интерфейса: обратный отсчёт в строке игры
   * набирается им */
  fontSizes: {
    xs: '0.8125rem', // 13px
    sm: '0.9375rem', // 15px
    md: '1.0625rem', // 17px
    lg: '1.1875rem', // 19px
    xl: '1.3125rem', // 21px
    xxl: '1.625rem', // 26px
  },

  headings: {
    fontFamily: 'var(--sf-font-sans)',
    fontWeight: '700',
    textWrap: 'balance',
    sizes: {
      h1: { fontSize: '2.125rem', lineHeight: '1.25' },
      h2: { fontSize: '1.75rem', lineHeight: '1.3' },
      h3: { fontSize: '1.5rem', lineHeight: '1.35' },
      h4: { fontSize: '1.25rem', lineHeight: '1.4' },
      h5: { fontSize: '1.0625rem', lineHeight: '1.5' },
      h6: { fontSize: '0.9375rem', lineHeight: '1.5' },
    },
  },

  components: {
    /* Поверхности: Mantine красит Paper и Card в body/white, а DESIGN.md требует
     * различать фон приложения, обычную поверхность и приподнятую */
    Paper: {
      styles: {
        root: {
          backgroundColor: 'var(--sf-surface)',
          borderColor: 'var(--sf-border)',
        },
      },
    },

    Card: {
      defaultProps: { withBorder: true },
      styles: {
        root: {
          backgroundColor: 'var(--sf-surface)',
          borderColor: 'var(--sf-border)',
        },
      },
    },

    Modal: {
      styles: {
        content: { backgroundColor: 'var(--sf-surface-elevated)' },
        header: { backgroundColor: 'var(--sf-surface-elevated)' },
      },
    },

    Drawer: {
      styles: {
        content: { backgroundColor: 'var(--sf-surface-elevated)' },
        header: { backgroundColor: 'var(--sf-surface-elevated)' },
      },
    },

    Menu: {
      styles: {
        dropdown: {
          backgroundColor: 'var(--sf-surface-elevated)',
          borderColor: 'var(--sf-border)',
        },
      },
    },

    Popover: {
      styles: {
        dropdown: {
          backgroundColor: 'var(--sf-surface-elevated)',
          borderColor: 'var(--sf-border)',
        },
      },
    },

    Notification: {
      styles: {
        root: { backgroundColor: 'var(--sf-surface-elevated)' },
      },
    },

    /* Бейджи — инструмент сканирования информации, а не декор:
     * по умолчанию тонированный вариант, пилюля, ясный текст */
    Badge: {
      defaultProps: { variant: 'light' },
      styles: {
        root: {
          letterSpacing: '0.01em',
          textTransform: 'none',
          fontWeight: '600',
        },
      },
    },

    /* Иконочные действия — нейтральные, чтобы не конкурировать с Field */
    ActionIcon: {
      defaultProps: { variant: 'default' },
    },

    /* Контур фокуса Mantine берёт из primary filled: в тёмной схеме это
     * глубокая олива и состояние теряется. Подменяем на видимый акцент. */
    Input: {
      styles: {
        wrapper: { '--input-bd-focus': 'var(--sf-focus)' },
      },
    },

    Table: {
      defaultProps: { highlightOnHover: true, verticalSpacing: 'sm' },
      styles: {
        th: {
          color: 'var(--sf-text-secondary)',
          fontWeight: '600',
        },
      },
    },
  },
});
