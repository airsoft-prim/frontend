import type { ReactNode } from 'react';
import {
  Anchor,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconArrowRight,
  IconChevronDown,
  IconSpeakerphone,
  IconShield,
  IconUsers,
} from '@tabler/icons-react';

import { Pallet, PalletAction } from './Pallet';
import { SkeletonLines } from './SkeletonBits';

/** Профиль игрока: данные появятся вместе с авторизацией */
function ProfileBlock() {
  return (
    <Group wrap="nowrap" align="flex-start" gap="md">
      <Skeleton height={64} width={64} radius="xl" />

      <Stack gap={8} style={{ flex: 1 }}>
        <Skeleton height={13} width="70%" radius="sm" />
        <Skeleton height={22} width={80} radius="xl" />
        <Skeleton height={10} width="50%" radius="sm" />
      </Stack>

      <IconChevronDown
        size={18}
        stroke={1.6}
        aria-hidden="true"
        style={{ color: 'var(--sf-text-muted)' }}
      />
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
 * «Командах», «Орг. комитетах» и «Пользователях». Высота делится как
 * 2/3 и 1/3: карточка игрока `2 1 0`, события `1 1 0`. Разделы внутри
 * карточки расходятся по высоте, а в событиях высоту делят строки — поэтому
 * ссылка «Все объявления» всегда прижата к низу карточки.
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
              secondary="Создать орг. комитет"
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
        icon={<IconSpeakerphone size={16} stroke={1.6} />}
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
            <PalletAction icon={<IconArrowRight size={14} stroke={1.6} />}>
              Все объявления
            </PalletAction>
          </Group>
        </Stack>
      </Pallet>
    </Stack>
  );
}
