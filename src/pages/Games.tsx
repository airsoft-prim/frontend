import { Box, Stack } from '@mantine/core';

import { SiteAside } from '../components/SiteAside';
import { SiteLayout } from '../components/SiteLayout';
import { GamesFeed } from '../components/games/GamesFeed';
import { GamesStats } from '../components/games/GamesStats';
import { HeroBanner } from '../components/games/HeroBanner';

/**
 * Раздел «Игры»: слева общий блок пользователя, справа контент раздела.
 *
 * Контент делится надвое (`.sf-split`): список игр и статистика по играм.
 * Пропорции задают два класса: `.sf-page-layout` — блок пользователя
 * и контент, `.sf-split` — список и статистика. Колонки растянуты на одну
 * высоту, поэтому низ совпадает, а на узких экранах сначала идёт контент.
 */
export function Games() {
  return (
    <SiteLayout aside={<SiteAside />}>
      <Box className="sf-split">
        <Stack gap="xl" h="100%">
          <HeroBanner />
          <GamesFeed />
        </Stack>

        <GamesStats />
      </Box>
    </SiteLayout>
  );
}
