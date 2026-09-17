import { Box, Stack, Text, Title } from '@mantine/core';

import { SiteAside } from '../components/SiteAside';
import { SiteLayout } from '../components/SiteLayout';
import { EventsFeed } from '../components/feed/EventsFeed';

/**
 * «Все события» — лента игр и объявлений сообщества.
 *
 * Раздел, а не документ: слева стоит общий блок пользователя, как на остальных
 * страницах разделов. Список идёт от новых публикаций к старым; типы событий
 * разделяют вкладки, поэтому игра и объявление живут в одной ленте.
 *
 * Заголовок и подпись держит страница, а не список: так страница совпадает
 * с остальными разделами портала, а лента остаётся только списком.
 */
export function Feed() {
  return (
    <SiteLayout aside={<SiteAside />}>
      <Stack gap="md">
        <Box>
          <Title order={1} size="h3" mb={4}>
            Лента событий
          </Title>
          <Text className="sf-meta">
            Игры, сборы и объявления сообщества — от новых к старым
          </Text>
        </Box>

        <EventsFeed />
      </Stack>
    </SiteLayout>
  );
}
