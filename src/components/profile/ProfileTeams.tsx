import { useState } from 'react';
import { Box, Group, Pagination, Stack } from '@mantine/core';
import { IconShield } from '@tabler/icons-react';

import { Pallet } from '../Pallet';
import { MicroCard } from './MicroCard';
import { TEAMS } from './demo';

/** Сколько микрокарточек на странице: четыре в ряд, три ряда */
const PAGE_SIZE = 12;

/**
 * Сетка карточек: колонки одной ширины и сами подстраиваются под место —
 * на узком экране их становится меньше, а название не выжимается в одну
 * строку с многоточием. Содержимое прижато к верхнему краю: свободная высота
 * остаётся внизу, а не растягивает карточки.
 */
const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 'var(--mantine-spacing-md)',
  alignContent: 'start',
} as const;

/**
 * Обёртка карточки с долей высоты. Список занимает всю высоту карточки,
 * а сама карточка — ту долю, что на первой вкладке занимают биография
 * со статистикой: при переключении вкладок колонка не прыгает по высоте
 * (см. ProfileAbout).
 */
const GROW_STYLE = {
  display: 'grid',
  gridTemplateRows: '1fr',
  flex: '5 1 auto',
} as const;

/**
 * «Команды» — третья вкладка профиля: полный список команд, в которых состоит
 * игрок.
 *
 * Каждая команда — микрокарточка: название, роль в команде (командир или
 * игрок) и круг под эмблему. Список разбит на страницы, листание снизу —
 * компактный селектор страниц, как в ленте раздела.
 */
export function ProfileTeams() {
  const [page, setPage] = useState(1);
  const items = TEAMS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box style={GROW_STYLE}>
      <Pallet
        title="Команды"
        titleSize="md"
        icon={<IconShield size={22} stroke={1.6} />}
        divider
      >
        <Stack h="100%" justify="space-between" gap="md">
          <Box style={GRID_STYLE}>
            {items.map((team) => (
              <MicroCard
                key={team.name}
                title={team.name}
                note={team.role}
                avatarUrl={team.avatarUrl}
                actionLabel="Открыть страницу команды"
              />
            ))}
          </Box>

          <Group justify="center">
            <Pagination
              total={Math.ceil(TEAMS.length / PAGE_SIZE)}
              value={page}
              onChange={setPage}
              size="sm"
              siblings={1}
              withEdges={false}
            />
          </Group>
        </Stack>
      </Pallet>
    </Box>
  );
}
