import type { ReactNode } from 'react';
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconArrowRight,
  IconChevronDown,
  IconSettings,
  IconSpeakerphone,
  IconShield,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

import { Pallet, PalletAction } from './Pallet';
import { SkeletonLines } from './SkeletonBits';

/**
 * Профиль игрока: аватар, позывной и роль — данные появятся вместе
 * с авторизацией. Роль стоит отдельной плашкой под позывным: это бейдж
 * (как в макете), а не ещё одна строка текста.
 *
 * Аватар компактнее блока, потому что его ширина отдана позывному: полоса
 * позывного занимает всю колонку, поэтому длинное имя не обрежется.
 * Аватар — круг при любом размере (`50%`, а не шаг шкалы: у её ступеней
 * радиус не равен половине стороны).
 *
 * Позывной выровнен по верхнему краю аватара — как подпись организатора
 * в строке игры. Сам блок сдвинут от потолка карточки (`mt`): карточка
 * высокая, и профиль, прижатый к верхней границе, читался оторванным
 * от остального содержимого.
 */
function ProfileBlock() {
  return (
    <Group wrap="nowrap" align="flex-start" gap="md" mt="lg">
      <Skeleton height={80} width={80} radius="50%" />

      <Stack gap={10} style={{ flex: 1, minWidth: 0 }}>
        {/* Позывной: полоса во всю колонку — имя может быть длинным.
         * Потолок нужен для мобильного: там колонка во всю ширину, и полоса
         * в 500px обещала бы имя в полсотни знаков */}
        <Skeleton height={21} width="100%" radius="sm" style={{ maxWidth: 200 }} />

        <Skeleton height={26} width={88} radius="xl" />
      </Stack>

      {/* Шеврон — раскрывает меню поверх соседних карточек: оно рендерится
       * в портале, поэтому не режется границами колонки. Подложка наведения
       * нейтральная: действие второстепенное. «Профиль» ведёт на /users/me/ —
       * тот же адрес, что и /users/{hex}, только свой: сегмент «me» читается
       * как собственный номер (см. ProfilePassport); «Настройки» пока
       * заглушка — такой страницы нет, поэтому пункт ничего не открывает
       * (как действие паллетки без href). Значок у каждого пункта свой: он
       * подсказывает, куда пункт ведёт, ещё до чтения подписи */}
      <Menu position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            color="gray"
            aria-label="Меню профиля"
          >
            <IconChevronDown size={20} stroke={1.6} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            component="a"
            href="/users/me/"
            leftSection={<IconUser size={16} stroke={1.6} />}
          >
            Профиль
          </Menu.Item>

          <Menu.Item leftSection={<IconSettings size={16} stroke={1.6} />}>
            Настройки
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

/** Раздел внутри общей карточки: заголовок и содержимое */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Text fw={600} size="sm" mb="md">
        {title}
      </Text>
      {children}
    </Box>
  );
}

interface EmptyStateProps {
  note: string;
  action: string;
  secondary: string;
  /** Раздел навигации, куда ведут оба действия */
  href: string;
  color?: 'field' | 'sand';
  icon: typeof IconUsers;
}

/**
 * Пустое состояние раздела: объяснение и два действия.
 * Оба действия — ссылки в соответствующий раздел навигации: сценарии
 * «вступить» и «создать» живут на его странице, а не в панели слева.
 */
function EmptyState({
  note,
  action,
  secondary,
  href,
  color = 'field',
  icon: Icon,
}: EmptyStateProps) {
  return (
    <Stack gap="md" align="center" py="xs">
      <ThemeIcon variant="light" color={color} size={56} radius="xl">
        <Icon size={28} stroke={1.5} />
      </ThemeIcon>

      <Text size="xs" ta="center" style={{ color: 'var(--sf-text-secondary)' }}>
        {note}
      </Text>

      <Button component="a" href={href} color={color} fullWidth>
        {action}
      </Button>

      <Anchor
        component="a"
        href={href}
        size="xs"
        underline="hover"
        style={{ color: 'var(--sf-text-secondary)' }}
      >
        {secondary}
      </Anchor>
    </Stack>
  );
}

/** Строка новости тянется по высоте карточки — как строки правой колонки:
 * они делят отведённое место, поэтому ссылка внизу остаётся на месте,
 * а прокрутка не появляется */
const NEWS_ROW_STYLE = {
  flex: '1 1 0',
  minHeight: 0,
  overflow: 'hidden',
} as const;

/** Иконка-превью новости: квадрат по высоте строки с потолком в 40px */
const NEWS_ICON_STYLE = {
  flex: '0 0 auto',
  width: 'auto',
  height: '100%',
  maxHeight: 40,
  aspectRatio: '1 / 1',
} as const;

/**
 * Блок пользователя — левая колонка любого раздела: игрок со своими
 * командами и орг. группами, ниже — события и объявления.
 *
 * Блок про игрока, а не про раздел, поэтому он один и тот же на «Играх»,
 * «Командах», «Орг. группах» и «Пользователях». Высота делится как
 * 2/3 и 1/3: карточка игрока `2 1 0`, события `1 1 0`. Разделы внутри
 * карточки расходятся по высоте, а в событиях высоту делят строки — поэтому
 * ссылка «Все объявления» всегда прижата к низу карточки.
 *
 * Содержимое разделов стоит прямо на поверхности карточки, без подложек:
 * запись о команде или орг. группе — самостоятельная карточка на фоне
 * (`Card withBorder`, как строка игры), поэтому список не нуждается в общем
 * фоне под собой и не получает его.
 *
 * Строки ведут в ленту событий («Все объявления» → `/feed/`): это полный
 * список игр и объявлений, а в карточке помещается только последние.
 */
export function SiteAside() {
  return (
    <Stack gap="md" h="100%">
      <Card withBorder padding="md" style={{ flex: '2 1 0' }}>
        <Stack
          gap="lg"
          justify="space-between"
          style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
        >
          <ProfileBlock />

          <Divider />

          <Section title="Мои команды">
            <EmptyState
              note="Вы не состоите ни в одной команде"
              action="Вступить в команду"
              secondary="Создать команду"
              href="/teams/"
              icon={IconUsers}
            />
          </Section>

          <Divider />

          <Section title="Мои орг. группы">
            <EmptyState
              note="Вы не состоите ни в одной орг. группе"
              action="Вступить в орг. группу"
              secondary="Создать орг. группу"
              href="/committees/"
              color="sand"
              icon={IconShield}
            />
          </Section>
        </Stack>
      </Card>

      <Pallet
        title="События и объявления"
        grow={1}
        icon={<IconSpeakerphone size={18} stroke={1.6} />}
      >
        {/* Строки делят высоту карточки: поэтому они выше, чем при обычном
         * шаге, а ссылка оказывается строго внизу — и не уезжает под прокрутку */}
        <Stack gap={8} h="100%">
          {[0, 1, 2, 3, 4].map((row) => (
            <Group
              key={row}
              wrap="nowrap"
              gap="sm"
              align="center"
              style={NEWS_ROW_STYLE}
            >
              <Skeleton radius="sm" style={NEWS_ICON_STYLE} />
              <Stack gap={6} justify="center" style={{ flex: 1, minWidth: 0 }}>
                <SkeletonLines widths={['85%', '40%']} height={9} />
              </Stack>
            </Group>
          ))}

          <Group justify="center" mt="auto">
            <PalletAction
              href="/feed/"
              icon={<IconArrowRight size={14} stroke={1.6} />}
            >
              Все объявления
            </PalletAction>
          </Group>
        </Stack>
      </Pallet>
    </Stack>
  );
}
