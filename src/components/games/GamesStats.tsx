import { Group, Skeleton, Stack, Text } from '@mantine/core';
import {
  IconArrowRight,
  IconCheck,
  IconStar,
  IconUsers,
} from '@tabler/icons-react';

import { Pallet, PalletAction } from '../Pallet';
import { SkeletonLines } from '../SkeletonBits';

/** Число в рейтинге — часть разметки, поэтому оно настоящее */
function Rank({ value }: { value: number }) {
  return (
    <Text
      size="sm"
      fw={700}
      className="sf-tnum"
      style={{ color: 'var(--sf-text-muted)', minWidth: 14 }}
    >
      {value}
    </Text>
  );
}

/**
 * Строка тянется по высоте карточки: строки делят её поровну, поэтому внизу
 * не остаётся пустоты, а на низком окне список ужимается без прокрутки.
 * `overflow: hidden` держит содержимое внутри строки — иначе сжатая строка
 * растянула бы прокручиваемую область паллетки.
 */
const ROW_STYLE = {
  flex: '1 1 0',
  minHeight: 0,
  overflow: 'hidden',
} as const;

/** Квадратное превью по высоте строки: растёт и сжимается вместе с ней */
const THUMB_STYLE = {
  flex: '0 0 auto',
  width: 'auto',
  height: '100%',
  maxHeight: 44,
  aspectRatio: '1 / 1',
} as const;

function RegistrationRow() {
  return (
    <Group wrap="nowrap" gap="sm" align="center" style={ROW_STYLE}>
      <Skeleton radius="sm" style={THUMB_STYLE} />
      <Stack gap={6} justify="center" style={{ flex: 1, minWidth: 0 }}>
        <SkeletonLines widths={['80%', '55%']} height={9} />
      </Stack>
    </Group>
  );
}

/** Строка рейтинга: место, превью, подпись и место под значение справа */
function TopRow({ rank, trail }: { rank: number; trail?: number }) {
  return (
    <Group wrap="nowrap" gap="xs" align="center" style={ROW_STYLE}>
      <Rank value={rank} />
      <Skeleton radius="sm" style={THUMB_STYLE} />
      <Stack gap={6} justify="center" style={{ flex: 1, minWidth: 0 }}>
        <Skeleton height={10} width="75%" radius="sm" />
      </Stack>
      {trail && <Skeleton height={10} width={trail} radius="sm" />}
    </Group>
  );
}

/**
 * Статистика раздела игр: мои регистрации и два рейтинга по пять строк.
 *
 * Это вторая часть контента на странице игр (`sf-split`): каждая паллетка
 * занимает свою треть высоты колонки (`grow={1}`), поэтому все три
 * одинаковой высоты. Строки растягиваются по этой высоте, так что списки
 * не прокручиваются и не выглядят полупустыми.
 */
export function GamesStats() {
  return (
    <Stack gap="md" h="100%">
      <Pallet
        title="Мои регистрации"
        grow={1}
        icon={<IconCheck size={18} stroke={1.6} />}
      >
        <Stack gap={8} h="100%">
          {[0, 1, 2, 3, 4].map((row) => (
            <RegistrationRow key={row} />
          ))}

          {/* Ссылка — последняя строка паллетки: строки делят высоту,
           * поэтому она всегда прижата к низу */}
          <Group justify="center" mt="auto">
            <PalletAction icon={<IconArrowRight size={14} stroke={1.6} />}>
              Все мои регистрации
            </PalletAction>
          </Group>
        </Stack>
      </Pallet>

      <Pallet
        title="Топ 5 игр по участникам"
        grow={1}
        icon={<IconUsers size={18} stroke={1.6} />}
      >
        {/* Подзаголовок и строки — соседи в одном столбце: строки делят
         * высоту карточки, а вложенный блок выталкивал бы их из области */}
        <Stack gap={8} h="100%">
          <Text className="sf-meta">За всё время</Text>

          {[1, 2, 3, 4, 5].map((rank) => (
            /* 44px — место под число участников */
            <TopRow key={rank} rank={rank} trail={44} />
          ))}
        </Stack>
      </Pallet>

      <Pallet
        title="Топ 5 игр по оценке"
        grow={1}
        icon={<IconStar size={18} stroke={1.6} />}
      >
        <Stack gap={8} h="100%">
          <Text className="sf-meta">За всё время</Text>

          {[1, 2, 3, 4, 5].map((rank) => (
            /* 26px — место под оценку вида 8.5 */
            <TopRow key={rank} rank={rank} trail={26} />
          ))}
        </Stack>
      </Pallet>
    </Stack>
  );
}
