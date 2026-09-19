import { SiteAside } from '../components/SiteAside';
import { SiteLayout } from '../components/SiteLayout';
import { TeamsFeed } from '../components/teams/TeamsFeed';

/**
 * Раздел «Команды»: слева общий блок пользователя, справа список команд.
 *
 * Колонка контента одна — в отличие от «Игр» её не делят надвое: у списка
 * команд нет второй колонки со статистикой, поэтому лента занимает всю
 * ширину контентной колонки.
 */
export function Teams() {
  return (
    <SiteLayout aside={<SiteAside />}>
      <TeamsFeed />
    </SiteLayout>
  );
}
