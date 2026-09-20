import { Box, Stack } from '@mantine/core';

import { SiteLayout } from '../components/SiteLayout';
import { ProfileContacts } from '../components/profile/ProfileContacts';
import { ProfileMain } from '../components/profile/ProfileMain';
import { ProfilePassport } from '../components/profile/ProfilePassport';

/**
 * Страница профиля игрока — «Паспорт страйкболиста».
 *
 * Отвечает и на `/me/`, и на `/users/{hex}`: это один и тот же документ,
 * а hex игрока приходит из адреса (см. ProfilePassport). Общий блок
 * пользователя слева (`aside`) здесь не нужен: страница и есть блок
 * пользователя, только развёрнутый на всю ширину.
 *
 * Колонки раскладывает `.sf-profile-layout`: слева шапка с вкладками и их
 * содержимое, справа паспорт и контакты. Доли высоты распределяют сами
 * карточки — от обложки до футера, чтобы страница не обрывалась на середине
 * экрана, как в макете.
 */
export function Me() {
  return (
    <SiteLayout>
      <Box className="sf-profile-layout">
        <ProfileMain />

        <Stack gap="md">
          <ProfilePassport />
          <ProfileContacts />
        </Stack>
      </Box>
    </SiteLayout>
  );
}
