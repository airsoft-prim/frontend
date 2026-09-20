import {
  Box,
  Burger,
  Drawer,
  Group,
  NavLink,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendarCheck,
  IconSearch,
  IconShield,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

import { ColorSchemeToggle } from './ColorSchemeToggle';
import { LogoMark } from './LogoMark';

/**
 * Разделы портала. Кроме «Игр», страницы ещё не созданы — ссылки отдают 404,
 * пока разделы не появятся.
 */
interface NavItem {
  label: string;
  href: string;
  /**
   * Дополнительные адреса, которые тоже принадлежат разделу. Свой профиль
   * открывается и по `/me/` — это шорткат к `/users/{hex}`, поэтому вкладка
   * раздела остаётся активной и на нём.
   */
  aliases?: string[];
  icon: typeof IconUser;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Игры', href: '/games/', icon: IconCalendarCheck },
  { label: 'Команды', href: '/teams/', icon: IconShield },
  { label: 'Орг. Группы', href: '/committees/', icon: IconUsers },
  {
    label: 'Пользователи',
    href: '/users/',
    aliases: ['/me/'],
    icon: IconUser,
  },
];

const SEARCH_PLACEHOLDER = 'Поиск по играм, командам, пользователям...';

/* Приложение клиентское, но проверка нужна: без неё шапка падает при рендере
 * на сервере (например, в проверках). */
function getPathname() {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

interface NavLinksProps {
  pathname: string;
  onNavigate?: () => void;
  /** Табличный вид: активный пункт подчёркнут снизу (горизонтальная навигация) */
  tabs?: boolean;
}

/** Активен ли раздел: /games/, /games и /games/123 — всё это «Игры». */
function isActivePath(
  pathname: string,
  href: string,
  aliases?: readonly string[]
) {
  const path = pathname.replace(/\/+$/, '');

  return [href, ...(aliases ?? [])].some((address) => {
    const target = address.replace(/\/+$/, '');
    return path === target || path.startsWith(`${target}/`);
  });
}

/** Один список ссылок на два места: горизонтальная навигация и меню в Drawer */
function NavLinks({ pathname, onNavigate, tabs }: NavLinksProps) {
  return (
    <>
      {NAV_ITEMS.map(({ label, href, aliases, icon: Icon }) => {
        const active = isActivePath(pathname, href, aliases);

        return (
          <NavLink
            key={href}
            component="a"
            href={href}
            label={label}
            active={active}
            aria-current={active ? 'page' : undefined}
            leftSection={<Icon size={18} stroke={1.6} />}
            onClick={onNavigate}
            /* Подложка наведения и гашение подложки у активной вкладки —
             * классом из global.css: styles-проп раскладывается в inline-стили,
             * а инлайн не умеет `:hover` */
            classNames={{ root: tabs ? 'sf-nav-tab' : undefined }}
            styles={{
              root: {
                width: 'auto',
                /* Одинаковые поля у всех вкладок — промежутки между
                 * пунктами получаются ровными без отдельного gap */
                paddingInline: 14,
                paddingBlock: tabs ? 0 : 6,
                /* Скругление вкладки шапки задаёт .sf-nav-tab: наведение
                 * скругляет верхние углы, а inline-стиль перебил бы класс */
                borderRadius: tabs ? undefined : 'var(--sf-radius)',
                ...(tabs
                  ? {
                      height: '100%',
                      alignItems: 'center',
                      color: active
                        ? 'var(--sf-text-primary)'
                        : 'var(--sf-text-secondary)',
                      /* Черта — фон фиксированной ширины, а не рамка пункта:
                       * иначе её длина зависела бы от длины подписи. Так она
                       * одинакова у всех вкладок и прижата к низу шапки. */
                      backgroundImage: active
                        ? 'linear-gradient(var(--sf-text-primary), var(--sf-text-primary))'
                        : undefined,
                      backgroundSize: 'var(--sf-tab-indicator) 2px',
                      backgroundPosition: 'center bottom',
                      backgroundRepeat: 'no-repeat',
                    }
                  : {}),
              },
              label: {
                fontSize: 'var(--mantine-font-size-sm)',
                /* Один вес у всех: жирная подпись меняла бы ширину пункта
                 * и сдвигала соседей при переходе между разделами */
                fontWeight: 600,
              },
            }}
          />
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = getPathname();
  /* «Переключатель вкладок» нужен только на страницах-разделах.
   * В документах (правила, политика, дизайн-пример) он лишний. */
  const isSectionPage = NAV_ITEMS.some(({ href, aliases }) =>
    isActivePath(pathname, href, aliases)
  );

  return (
    <Box
      component="header"
      pos="sticky"
      top={0}
      style={{
        zIndex: 'var(--mantine-z-index-app)',
        backgroundColor: 'var(--sf-surface)',
        borderBottom: '1px solid var(--sf-border)',
      }}
    >
      <Box
        className="sf-grid-3col"
        style={{
          minHeight: 64,
          paddingInline: 'var(--sf-gutter)',
        }}
      >
        {/* Ссылка на главную без подложки и без подчёркивания: логотип ведёт
         * на корень неявно, как это делают на большинстве сайтов. Ширина по
         * содержимому — чтобы кликабельным не становился весь левый столбец */}
        <Box
          component="a"
          href="/"
          style={{
            /* Явные номера колонок: когда навигации нет, правый блок всё равно
             * остаётся у правого края, а не съезжает в середину */
            gridColumn: 1,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: 'var(--mantine-spacing-xs)',
            width: 'fit-content',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <LogoMark size={38} />
          <Stack gap={0}>
            <Text fw={800} fz={24} lh={1.1} style={{ letterSpacing: '0.05em' }}>
              AIRSOFT PRIM
            </Text>
            <Text size="sm" style={{ color: 'var(--sf-text-muted)' }}>
              Страйкбол в Приморье
            </Text>
          </Stack>
        </Box>

        {isSectionPage && (
          <Group
            gap={0}
            wrap="nowrap"
            visibleFrom="lg"
            align="stretch"
            style={{ gridColumn: 2, alignSelf: 'stretch' }}
          >
            <NavLinks pathname={pathname} tabs />
          </Group>
        )}

        <Group
          gap="xs"
          wrap="nowrap"
          justify="flex-end"
          style={{ gridColumn: 3 }}
        >
          <TextInput
            visibleFrom="lg"
            size="sm"
            radius="md"
            w={320}
            placeholder={SEARCH_PLACEHOLDER}
            aria-label="Поиск по порталу"
            leftSection={<IconSearch size={16} stroke={1.6} />}
          />

          <ColorSchemeToggle />

          <Burger
            opened={opened}
            onClick={open}
            hiddenFrom="lg"
            size="sm"
            aria-label="Открыть меню"
          />
        </Group>
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xs"
        title="Меню"
      >
        <Stack gap="sm">
          <TextInput
            size="sm"
            placeholder={SEARCH_PLACEHOLDER}
            aria-label="Поиск по порталу"
            leftSection={<IconSearch size={16} stroke={1.6} />}
          />
          {isSectionPage && (
            <Stack gap={2}>
              <NavLinks pathname={pathname} onNavigate={close} />
            </Stack>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
