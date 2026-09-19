import { SiteAside } from '../components/SiteAside';
import { SiteLayout } from '../components/SiteLayout';
import { CommitteesFeed } from '../components/committees/CommitteesFeed';

/**
 * Раздел «Орг. Группы»: слева общий блок пользователя, справа список
 * орг. групп. Колонка контента одна — как на «Командах», её не делят надвое.
 */
export function Committees() {
  return (
    <SiteLayout aside={<SiteAside />}>
      <CommitteesFeed />
    </SiteLayout>
  );
}
