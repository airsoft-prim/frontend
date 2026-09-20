import { useState } from 'react';
import { Tabs } from '@mantine/core';

import { ProfileAbout } from './ProfileAbout';
import { ProfileCommittees } from './ProfileCommittees';
import { ProfileGames } from './ProfileGames';
import { ProfileHero } from './ProfileHero';
import { ProfileStats } from './ProfileStats';
import { ProfileTeams } from './ProfileTeams';

/**
 * Вкладки профиля: значения совпадают со значениями `Tabs.Tab` в шапке
 * (см. ProfileHero). Список — единственный источник и для типа, и для
 * проверки значения, поэтому разойтись с разметкой вкладок он не может.
 */
const TABS = ['about', 'games', 'teams', 'committees'] as const;

type ProfileTab = (typeof TABS)[number];

/** Своя ли вкладка: `Tabs` отдаёт выбранное значение обычной строкой */
function isProfileTab(value: string | null): value is ProfileTab {
  return (TABS as readonly string[]).includes(value ?? '');
}

/**
 * Панель вкладки: карточки вкладки делят её высоту между собой, поэтому
 * панель — столбец во всю оставшуюся высоту колонки, а не блок по содержимому.
 *
 * Минимальная высота — по содержимому (по умолчанию): карточки растягиваются,
 * но не сжимаются меньше своего текста. С `min-height: 0` панель отдавала бы
 * высоту карточкам даже тогда, когда колонка её не задаёт (один столбец
 * на узком экране) — и биография со статистикой схлопнулись бы.
 */
const PANEL_STYLE = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--mantine-spacing-md)',
} as const;

/**
 * Левая колонка страницы профиля: шапка с вкладками и содержимое вкладки.
 *
 * Вкладки разрезают контент, а не страницу: `Tabs.List` стоит в шапке
 * (ProfileHero), панели — под ней отдельными карточками. Обе половины связаны
 * контекстом `Tabs`, поэтому список и содержимое остаются одним механизмом
 * с клавиатурой и ARIA-разметкой.
 *
 * Высота колонки делится между шапкой и панелью: шапка держит свою высоту
 * (обложка и аватар не сжимаются), а карточки вкладки растягиваются на
 * остаток — так колонка доходит до футера, а не обрывается на содержимом.
 *
 * Минимальная высота колонки — тоже по содержимому: на узком экране колонка
 * одна и её высоту не задаёт никто, поэтому колонка должна расти от карточек,
 * а не наоборот.
 */
export function ProfileMain() {
  const [tab, setTab] = useState<ProfileTab>('about');

  return (
    <Tabs
      value={tab}
      onChange={(value) => setTab(isProfileTab(value) ? value : 'about')}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mantine-spacing-md)',
      }}
    >
      <ProfileHero />

      <Tabs.Panel value="about" style={PANEL_STYLE}>
        <ProfileAbout />
        <ProfileStats />
      </Tabs.Panel>

      <Tabs.Panel value="games" style={PANEL_STYLE}>
        <ProfileGames />
      </Tabs.Panel>

      <Tabs.Panel value="teams" style={PANEL_STYLE}>
        <ProfileTeams />
      </Tabs.Panel>

      <Tabs.Panel value="committees" style={PANEL_STYLE}>
        <ProfileCommittees />
      </Tabs.Panel>
    </Tabs>
  );
}
