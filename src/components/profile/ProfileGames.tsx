import { useState } from 'react';
import { Box, Group, Pagination, Stack } from '@mantine/core';
import { IconCalendarCheck } from '@tabler/icons-react';

import { Pallet } from '../Pallet';
import { MicroCard } from './MicroCard';
import { GAMES } from './demo';

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
 * «Игры» — вторая вкладка профиля: игры, в которых игрок участвовал.
 *
 * Каждая игра — микрокарточка: название, даты проведения и круг под аватар.
 * Листание снизу — компактный селектор страниц, как в ленте раздела: тот же
 * механизм для того же действия.
 *
 * Сетка, а не строки на всю ширину: так карточки читаются как список событий,
 * а не как таблица с датами у правого края.
 */
export function ProfileGames() {
  const [page, setPage] = useState(1);
  const items = GAMES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box style={GROW_STYLE}>
      <Pallet
        title="Игры"
        titleSize="md"
        icon={<IconCalendarCheck size={22} stroke={1.6} />}
        divider
      >
        <Stack h="100%" justify="space-between" gap="md">
          <Box style={GRID_STYLE}>
            {items.map((game) => (
              <MicroCard
                key={game.title}
                title={game.title}
                note={game.dates}
                avatarUrl={game.avatarUrl}
                actionLabel="Открыть страницу игры"
              />
            ))}
          </Box>

          <Group justify="center">
            <Pagination
              total={Math.ceil(GAMES.length / PAGE_SIZE)}
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
