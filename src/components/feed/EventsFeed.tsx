import { useState } from 'react';
import {
  Card,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Tabs,
} from '@mantine/core';

import { SkeletonChips, SkeletonLines } from '../SkeletonBits';

/** Что показывает лента: всё подряд, только игры или только объявления */
const TABS = [
  { value: 'all', label: 'Все' },
  { value: 'games', label: 'Игры' },
  { value: 'announcements', label: 'Объявления' },
];

/** Сколько событий на странице */
const PAGE_SIZE = 5;

/**
 * Строка события: превью, заголовок с подводкой, теги и дата публикации.
 * Наполнение — скелетоны: структура строки зафиксирована, данные подставит API.
 */
function EventRowSkeleton() {
  return (
    <Card withBorder padding="md">
      <Group wrap="wrap" align="flex-start" gap="md">
        <Skeleton height={72} width={104} radius="sm" visibleFrom="sm" />

        <Stack gap={8} style={{ flex: 1, minWidth: 180 }}>
          <Skeleton height={15} width="55%" radius="sm" />
          <SkeletonLines widths={['85%', '62%']} height={11} />
          <SkeletonChips widths={[86, 64]} />
        </Stack>

        <Stack gap={8} w={128}>
          <Skeleton height={11} width="70%" radius="sm" />
          <Skeleton height={14} width="90%" radius="sm" />
        </Stack>
      </Group>
    </Card>
  );
}

/**
 * Лента событий: вкладки по типам, страница строк и селектор страниц.
 *
 * Устроена как лента игр (GamesFeed): строки — самостоятельные карточки
 * на фоне страницы, поэтому список читается одним потоком. Листание
 * offset-based, отсюда обычный селектор страниц вместо «показать ещё».
 */
export function EventsFeed() {
  const [tab, setTab] = useState('all');

  return (
    <Stack gap="md">
      <Tabs value={tab} onChange={(value) => setTab(value ?? 'all')}>
        <Tabs.List>
          {TABS.map(({ value, label }) => (
            <Tabs.Tab key={value} value={value}>
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <Stack gap="sm">
        {Array.from({ length: PAGE_SIZE }, (_, row) => (
          <EventRowSkeleton key={row} />
        ))}
      </Stack>

      <Group justify="center">
        <Pagination
          defaultValue={1}
          total={8}
          size="sm"
          siblings={1}
          withEdges={false}
        />
      </Group>
    </Stack>
  );
}
