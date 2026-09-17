import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Tabs,
  Title,
} from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';

import { SkeletonChips } from '../SkeletonBits';

/**
 * Строка списка игр: превью, дата старта, название с тегами, организатор
 * и блок обратного отсчёта. Наполнение — скелетоны: структура строки
 * зафиксирована, данные подставит API.
 */
function GameRowSkeleton() {
  return (
    <Card withBorder padding="md">
      <Group wrap="wrap" align="flex-start" gap="md">
        <Skeleton height={104} width={152} radius="sm" visibleFrom="sm" />
        <Skeleton height={64} width={64} radius="sm" />

        <Stack gap={8} style={{ flex: 1, minWidth: 180 }}>
          <Skeleton height={15} width="60%" radius="sm" />
          <Skeleton height={11} width="42%" radius="sm" />
          <Skeleton height={11} width="34%" radius="sm" />
          <SkeletonChips widths={[86, 64]} />
        </Stack>

        <Group wrap="nowrap" gap="sm" align="center">
          <Skeleton height={42} width={42} radius="xl" />
          <Stack gap={8} w={124}>
            <Skeleton height={11} width="55%" radius="sm" />
            <Skeleton height={14} width="85%" radius="sm" />
          </Stack>
        </Group>

        <Stack gap={8} w={128}>
          <Skeleton height={11} width="65%" radius="sm" />
          <Skeleton height={17} width="80%" radius="sm" />
        </Stack>
      </Group>
    </Card>
  );
}

const TABS = [
  { value: 'open', label: 'Открыта регистрация' },
  { value: 'announced', label: 'Анонсированы' },
  { value: 'past', label: 'Проведены' },
];

/** Сколько игр показываем на странице */
const PAGE_SIZE = 5;

/**
 * Лента игр: заголовок, вкладки, страница строк и селектор страниц.
 *
 * Секция не обёрнута в карточку: строки — самостоятельные карточки
 * на фоне страницы, так список читается одним потоком.
 *
 * Листание offset-based, поэтому внизу стоит обычный селектор страниц,
 * а не «показать ещё»: селектор компактный (без кнопок первого и последнего
 * края, с одним соседом), чтобы отдать высоту строкам.
 *
 * Прокрутки у списка нет, а высота зафиксирована: на странице ровно
 * `PAGE_SIZE` строк. Сжимается под нехватку места баннер, а не строки —
 * поэтому лента не даёт себя ужать (`flexShrink: 0`) и не теряет строк
 * за границей блока.
 */
export function GamesFeed() {
  const [tab, setTab] = useState('open');

  return (
    <Box style={{ flexShrink: 0 }}>
      <Title order={3} size="h4" mb="sm">
        Игры
      </Title>

      <Tabs value={tab} onChange={(value) => setTab(value ?? 'open')}>
        <Group
          justify="space-between"
          align="center"
          gap="sm"
          mb="sm"
          wrap="nowrap"
        >
          <Tabs.List>
            {TABS.map(({ value, label }) => (
              <Tabs.Tab key={value} value={value}>
                {label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Button
            variant="default"
            size="xs"
            leftSection={<IconFilter size={14} stroke={1.6} />}
          >
            Фильтры
          </Button>
        </Group>
      </Tabs>

      <Stack gap="sm">
        {Array.from({ length: PAGE_SIZE }, (_, row) => (
          <GameRowSkeleton key={row} />
        ))}
      </Stack>

      <Group justify="center" pt="sm">
        <Pagination
          defaultValue={1}
          total={12}
          size="sm"
          siblings={1}
          withEdges={false}
        />
      </Group>
    </Box>
  );
}
