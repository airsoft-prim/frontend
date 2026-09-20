import type { ReactNode } from 'react';
import { Box, Card, Group, Text, ThemeIcon } from '@mantine/core';
import {
  IconCalendarCheck,
  IconChartBar,
  IconCheck,
  IconClock,
  IconX,
} from '@tabler/icons-react';

import { Pallet } from '../Pallet';
import {
  FIELD_HOURS,
  GAMES_PLAYED,
  MEASUREMENTS_FAILED,
  MEASUREMENTS_PASSED,
  SEASONS,
} from './demo';

/**
 * Кружок под иконку. Меньше обычного: метрик стало пять, и строка должна
 * уложиться в ширину панели целиком — перенос оставил бы одну карточку
 * на второй строке и вытолкнул колонку за высоту окна.
 */
const FIGURE_SIZE = 48;

/**
 * Обёртка карточки. Высоту карточка держит по содержимому: строка статистики
 * одна, и растянутая карточка оставляла бы пустоту под числами. Остаток
 * высоты колонки забирает биография — она и есть растущий блок
 * (см. ProfileAbout).
 */
const GROW_STYLE = {
  display: 'grid',
  gridTemplateRows: '1fr',
  flex: '0 0 auto',
} as const;

/**
 * Ряд карточек статистики внутри карточки раздела. Карточки идут по своему
 * содержимому и прижаты к левому краю: растянутые на всю ширину, они
 * превращали числа в пустые поля с цифрой у края. Зазор — шаг `xs`: пять
 * карточек должны встать в одну строку, а подписи короче не станут.
 */
const ROW_STYLE = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  gap: 'var(--mantine-spacing-xs)',
} as const;

/**
 * Карточка одного числа статистики: кружок с иконкой, число и подпись.
 *
 * Число набрано крупно и жирно — это главное, что читают в статистике,
 * подпись служит ему пояснением. Единица измерения стоит рядом с числом
 * и тише его: «128 ч» читается одним числом, а не числом с подписью.
 *
 * Пока метрика не посчитана (`null`), на месте числа стоит прочерк: пустой
 * кружок читался бы поломкой, а ноль — как «такого не было».
 */
function Stat({
  icon,
  value,
  unit,
  label,
}: {
  icon: ReactNode;
  /** Число метрики: `null` — не посчитана, карточка рисует прочерк */
  value: number | null;
  /** Единица измерения: без неё число читается только вместе с подписью */
  unit?: string;
  label: string;
}) {
  return (
    <Card withBorder padding="xs" style={{ flex: '0 0 auto' }}>
      <Group gap="xs" wrap="nowrap" align="center">
        <ThemeIcon variant="light" color="field" size={FIGURE_SIZE} radius="50%">
          {icon}
        </ThemeIcon>

        <Box>
          <Text fw={700} size="xxl" lh={1.2} className="sf-tnum">
            {value ?? '—'}
            {unit && (
              <Text
                span
                size="sm"
                fw={500}
                ml={4}
                style={{ color: 'var(--sf-text-muted)' }}
              >
                {unit}
              </Text>
            )}
          </Text>
          <Text size="sm" mt={4} style={{ color: 'var(--sf-text-secondary)' }}>
            {label}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}

/**
 * «Статистика» — вторая вкладка профиля: игры, сезоны и часы на полигонах,
 * а рядом замеры ствола — пройденные и проваленные.
 *
 * Карточка раздела называет блок, а каждое число лежит в своей карточке
 * внутри: метрики независимы, и своя рамка показывает это раньше подписи.
 * Игровые метрики помечены календарём с галочкой — тем же знаком, что
 * и раздел игр; часы — часами, а результат замера — галочкой и крестом:
 * цвет один, поэтому знаки должны различаться сами.
 */
export function ProfileStats() {
  return (
    <Box style={GROW_STYLE}>
      <Pallet
        title="Статистика"
        titleSize="md"
        icon={<IconChartBar size={22} stroke={1.6} />}
      >
        <Box style={ROW_STYLE}>
          <Stat
            icon={<IconCalendarCheck size={24} stroke={1.5} />}
            value={GAMES_PLAYED}
            label="Игр сыграно"
          />

          <Stat
            icon={<IconCalendarCheck size={24} stroke={1.5} />}
            value={SEASONS}
            label="Сезонов"
          />

          <Stat
            icon={<IconClock size={24} stroke={1.5} />}
            value={FIELD_HOURS}
            unit="ч"
            label="На полигонах"
          />

          <Stat
            icon={<IconCheck size={24} stroke={1.5} />}
            value={MEASUREMENTS_PASSED}
            label="Пройденных замеров"
          />

          <Stat
            icon={<IconX size={24} stroke={1.5} />}
            value={MEASUREMENTS_FAILED}
            label="Проваленных замеров"
          />
        </Box>
      </Pallet>
    </Box>
  );
}
