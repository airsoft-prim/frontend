import type { ReactNode } from 'react';
import { Anchor, Box, Card, Group, Text } from '@mantine/core';

interface PalletProps {
  /** Заголовок паллетки; без него содержимое занимает всю высоту */
  title?: string;
  /**
   * Иконка перед заголовком. Оттенок задаёт сама паллетка, поэтому
   * достаточно передать элемент иконки с нужным размером.
   */
  icon?: ReactNode;
  /**
   * Доля высоты колонки: `1` — одна часть, `2` — две и так далее.
   * Паллетки с `grow` делят высоту колонки пропорционально своим долям
   * (карточка игрока 2/3 и новости 1/3 — это `grow={2}` и `grow={1}`).
   * Без пропа паллетка занимает высоту своего содержимого.
   */
  grow?: number;
  children: ReactNode;
}

/**
 * Паллетка — базовая карточка страницы: одна тема, своя шапка, внутренние
 * отступы. Все блоки разделов собираются из них, чтобы страницы выглядели
 * однотипно.
 */
export function Pallet({ title, icon, grow, children }: PalletProps) {
  return (
    <Card
      withBorder
      padding="md"
      /* Базис нулевой: высота считается от доли, а не от содержимого —
       * тогда соседние паллетки встают ровно в заданных пропорциях */
      style={grow ? { flex: `${grow} 1 0` } : undefined}
    >
      {(title || icon) && (
        <Group gap="xs" wrap="nowrap" align="center" mb="sm">
          {icon && (
            <Box
              aria-hidden="true"
              style={{
                display: 'flex',
                /* Иконки приходят с currentColor, поэтому оттенок шапки
                 * задаётся здесь: он одинаков во всех паллетках */
                color: 'var(--sf-text-secondary)',
              }}
            >
              {icon}
            </Box>
          )}
          {title && (
            <Text fw={600} size="sm">
              {title}
            </Text>
          )}
        </Group>
      )}
      {/* Содержимое прокручивается внутри своей доли высоты: страница
       * от этого не растёт, а пропорции паллеток сохраняются */}
      <Box style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {children}
      </Box>
    </Card>
  );
}

interface PalletActionProps {
  children: ReactNode;
  icon?: ReactNode;
  /**
   * Адрес раздела, куда ведёт действие. Без него действие остаётся
   * кнопкой-заглушкой: раздел ещё не создан, вести некуда.
   */
  href?: string;
}

/**
 * Действие «Все …» в подвале паллетки.
 *
 * С `href` это обычная ссылка: такой раздел уже есть, и ссылка получает
 * адрес в разметке (клавиатура, средняя кнопка мыши и копирование адреса
 * работают как обычно). Без `href` остаётся кнопкой-заглушкой — для списков,
 * у которых раздела пока нет.
 */
export function PalletAction({ children, icon, href }: PalletActionProps) {
  const style = {
    color: 'var(--sf-text-secondary)',
    display: 'flex',
    gap: 6,
  } as const;

  if (href) {
    return (
      <Anchor
        component="a"
        href={href}
        size="xs"
        underline="hover"
        style={style}
      >
        {children}
        {icon}
      </Anchor>
    );
  }

  return (
    <Anchor
      component="button"
      type="button"
      size="xs"
      underline="hover"
      style={style}
    >
      {children}
      {icon}
    </Anchor>
  );
}
