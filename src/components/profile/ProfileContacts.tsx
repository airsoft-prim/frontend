import { ActionIcon, Anchor, Box, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import {
  IconAddressBook,
  IconArrowUpRight,
  IconBrandTelegram,
  IconBrandVk,
  IconCopy,
  IconMail,
  IconMessage,
  IconPhone,
} from '@tabler/icons-react';

import contactsArt from '../../content/images/profile-contacts-placeholder.png';
import { Pallet } from '../Pallet';
import { copyValue } from './copy';
import { CONTACTS } from './demo';

/** Квадрат под значок: он держит вес двух подписей рядом с ним */
const ICON_SIZE = 45;

/**
 * Как выглядит запись каждого вида.
 *
 * Мессенджеры залиты цветом, адрес и телефон — светлые: заливка отмечает
 * переписку как отдельный вид связи, а почта с телефоном остаются справкой.
 * У VK и MAX в макете фирменные синий и фиолетовый — их нет в палитре
 * проекта, поэтому взяты ближайшие по смыслу токены: `steel` для сервиса
 * и `sand` для вторичного акцента. Смысл записи от этого не меняется,
 * а интерфейс не получает цветов, которых нет в дизайн-системе.
 */
const KINDS = {
  telegram: { icon: IconBrandTelegram, color: 'field', variant: 'filled' },
  vk: { icon: IconBrandVk, color: 'steel', variant: 'filled' },
  max: { icon: IconMessage, color: 'sand', variant: 'filled' },
  email: { icon: IconMail, color: 'field', variant: 'light' },
  phone: { icon: IconPhone, color: 'field', variant: 'light' },
} as const;

/**
 * Доля высоты карточки: под паспортом остаётся вся свободная высота колонки.
 * Обёртка-сетка растягивает карточку на свою высоту и не даёт ей схлопнуться
 * там, где высоту не задаёт никто (см. ProfileAbout).
 */
const GROW_STYLE = {
  display: 'grid',
  gridTemplateRows: '1fr',
  flex: '1 1 auto',
} as const;

/** Список контактов и рисунок под ним: столбец во всю высоту карточки */
const BODY_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
} as const;

/**
 * Фигура с репликой внизу карточки: высоту берёт из свободного места,
 * которое осталось после контактов.
 *
 * На саму кромку карточки фигуру не выводим: и отрицательное поле, и сдвиг
 * расширяют область прокрутки тела паллетки, и в карточке появляется полоса
 * прокрутки. Рисунок остаётся в тех же полях, что и строки контактов.
 */
const ART_STYLE = {
  /* Основа нулевая: с `auto` в неё попадал собственный размер картинки
   * (1536px), и карточка вырастала под него вместо того, чтобы отдать
   * рисунку свободное место */
  flex: '1 1 0',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 'var(--mantine-spacing-xs)',
  marginTop: 'var(--mantine-spacing-md)',
} as const;

/**
 * Потолок высоты — чтобы на высоком окне фигура не разрослась на полкарточки.
 * Пропорции держит сам файл (2:3), поэтому ширину не задаём: её считает
 * браузер по высоте.
 */
const ART_IMAGE_STYLE = {
  maxHeight: 'min(100%, 260px)',
  maxWidth: '100%',
  /* Картинка — flex-элемент: без нулевой нижней границы она не сжимается
   * под остаток места и выдавливает реплику */
  minHeight: 0,
  objectFit: 'contain',
  objectPosition: 'bottom',
} as const;

/**
 * «Контакты» — справка в правой колонке: как связаться с игроком.
 *
 * Строки идут сверху вниз одним шагом и высоту карточки не делят: в списке
 * видно сразу все контакты, а растянутые по высоте строки разносили бы
 * подпись и её значение на пол-экрана друг от друга.
 *
 * Под контактами — фигура с репликой «Боец, приём!»: она занимает пустоту
 * внизу карточки, реплика стоит над фигурой. Картинка декоративная, поэтому
 * `alt` пуст и скринридер её пропускает; реплика набрана текстом и читается
 * как часть карточки.
 *
 * Значение — ссылка, как в контактах администрации (см. ContactsList):
 * почта открывает почтовую программу, телефон — набор номера, мессенджеры —
 * переписку в новой вкладке. Подпись над значением служебная, но читается
 * увереннее служебного текста: она называет способ связи, а не поясняет его.
 *
 * Адрес MAX в макете дан ником без схемы, а такой адрес не угадывается —
 * значение остаётся текстом, а действие строки копирует его.
 */
export function ProfileContacts() {
  return (
    <Box style={GROW_STYLE}>
      <Pallet
        title="Контакты"
        titleSize="md"
        icon={<IconAddressBook size={22} stroke={1.6} />}
      >
        <Box style={BODY_STYLE}>
          <Stack gap="md">
            {CONTACTS.map(({ kind, label, value, href }) => {
              const { icon: Icon, color, variant } = KINDS[kind];
              /* Ссылка на внешний ресурс открывается в новой вкладке, почта
               * и телефон — приложениями системы: там схема решает сама */
              const external = href?.startsWith('http');

              return (
                <Group key={label} wrap="nowrap" gap="md" align="center">
                  <ThemeIcon
                    size={ICON_SIZE}
                    radius="lg"
                    variant={variant}
                    color={color}
                  >
                    <Icon size={22} stroke={1.6} />
                  </ThemeIcon>

                  <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      size="xs"
                      fw={600}
                      style={{ color: 'var(--sf-text-secondary)' }}
                    >
                      {label}
                    </Text>

                    {href ? (
                      <Anchor
                        href={href}
                        size="sm"
                        fw={600}
                        underline="hover"
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        style={{ color: 'var(--sf-accent)' }}
                      >
                        {value}
                      </Anchor>
                    ) : (
                      <Text size="sm" fw={600}>
                        {value}
                      </Text>
                    )}
                  </Stack>

                  {external && href ? (
                    <ActionIcon
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      variant="subtle"
                      color="gray"
                      aria-label={`Открыть ${label}`}
                    >
                      <IconArrowUpRight size={18} stroke={1.6} />
                    </ActionIcon>
                  ) : (
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      aria-label={`Скопировать ${label}`}
                      onClick={() => copyValue(value, label)}
                    >
                      <IconCopy size={18} stroke={1.6} />
                    </ActionIcon>
                  )}
                </Group>
              );
            })}
          </Stack>

          {/* Фигура «Боец, приём!» — украшение карточки, а не контакт:
           * реплика стоит над фигурой, картинка не перехватывает нажатия */}
          <Box style={ART_STYLE}>
            <Text size="sm" fw={600} style={{ color: 'var(--sf-text-muted)' }}>
              Боец, приём!
            </Text>

            <Box
              component="img"
              src={contactsArt}
              alt=""
              aria-hidden="true"
              style={ART_IMAGE_STYLE}
            />
          </Box>
        </Box>
      </Pallet>
    </Box>
  );
}
