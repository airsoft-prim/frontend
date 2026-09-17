import { SiteAside } from '../components/SiteAside';
import { SiteLayout } from '../components/SiteLayout';

/**
 * Раздел «Пользователи». Заглушка: страница существует, чтобы вкладка
 * в шапке не вела в 404. Контент появится вместе с разделом; блок
 * пользователя слева — общий для всех основных разделов.
 */
export function Users() {
  return <SiteLayout aside={<SiteAside />} />;
}
