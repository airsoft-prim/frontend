import { SiteAside } from '../components/SiteAside';
import { SiteLayout } from '../components/SiteLayout';

/**
 * Раздел «Команды». Заглушка: страница существует, чтобы вкладка
 * в шапке не вела в 404. Контент появится вместе с разделом; блок
 * пользователя слева — общий для всех основных разделов.
 */
export function Teams() {
  return <SiteLayout aside={<SiteAside />} />;
}
