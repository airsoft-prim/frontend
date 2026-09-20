import type { ReactNode } from 'react';
import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import {
  IconCalendar,
  IconCopy,
  IconInfoCircle,
  IconQrcode,
  IconShield,
  IconUsers,
} from '@tabler/icons-react';

import { Pallet } from '../Pallet';
import { copyValue } from './copy';
import { REGISTERED_AT, ROLE } from './demo';

/**
 * Размер QR-кода. Квадрат по высоте двух строк рядом с ним: код ведёт
 * на страницу профиля, и поле номера стоит с ним в одной строке.
 */
const QR_SIZE = 88;

/**
 * Кегль номера паспорта. 32 знака должны уложиться в поле рядом с QR-кодом,
 * поэтому номер набран мельче служебного текста: он читается как номер,
 * а не как строка интерфейса. Моноширинный шрифт держит знаки на равном
 * расстоянии — номер не «плывёт» при смене цифр.
 */
const HEX_FONT_SIZE = 12;

/**
 * Что такое публичный номер. Подсказка у подписи: 32 знака сами о себе ничего
 * не говорят, а номер стоит в паспорте как публичные данные — игрок должен
 * понимать, что именно он показывает другим и чего в номере нет.
 */
const UUID_HINT =
  'Идентификатор аккаунта на портале: по нему вас находят другие игроки, он же зашит в QR-код из паспорта. Номер один на аккаунт и не меняется. Личных данных в нём нет, и войти в аккаунт по нему нельзя — показывать его безопасно.';

/**
 * Достаём hex-идентификатор из адреса: /users/{hex} — профиль игрока.
 *
 * На /me/ номера в адресе нет: это шорткат к своему профилю, а свой номер
 * придёт вместе с авторизацией. Поэтому на его месте стоит заглушка.
 * Проверки существования игрока пока нет — принимаем любой 32-значный hex
 * (валидация появится вместе с API).
 */
function getPassportHex(): string | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/users\/([0-9a-f]{32})\/?$/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Строка паспорта: значок, подпись и значение у правого края.
 * Значение вынесено вправо, потому что строк в карточке две и они короткие:
 * колонка значений читается одним взглядом.
 */
function PassportRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <Group wrap="nowrap" gap="sm" justify="space-between" py="sm">
      <Group gap="sm" wrap="nowrap">
        <Box
          aria-hidden="true"
          style={{ display: 'flex', color: 'var(--sf-text-muted)' }}
        >
          {icon}
        </Box>
        <Text size="sm" style={{ color: 'var(--sf-text-secondary)' }}>
          {label}
        </Text>
      </Group>

      {value}
    </Group>
  );
}

/**
 * «Паспорт страйкболиста» — документ игрока в правой колонке: QR-код,
 * публичный номер, роль, дата регистрации и пояснение к коду.
 *
 * Номер — hex-представление UUID длиной 32 знака. Рядом с ним значок
 * копирования: номер длинный и его переносят в другие приложения целиком,
 * вручную его не набирают.
 *
 * Строка «Полное имя» в макете подписана ролью игрока: имя приходит вместе
 * с API, а роль — часть паспорта, поэтому плашка стоит в этой строке.
 */
export function ProfilePassport() {
  const hex = getPassportHex();

  return (
    <Pallet
      title="Паспорт страйкболиста"
      titleSize="md"
      icon={<IconQrcode size={22} stroke={1.6} />}
    >
      <Stack gap="lg">
        <Group wrap="nowrap" gap="md" align="flex-start">
          {/* QR-код ведёт на страницу профиля; сам код появится вместе
           * с номером игрока, поэтому на его месте заглушка */}
          <Skeleton
            height={QR_SIZE}
            width={QR_SIZE}
            radius="sm"
            style={{ flex: '0 0 auto' }}
          />

          <Stack gap={6} style={{ flex: 1, minWidth: 0 }}>
            <Group
              wrap="nowrap"
              gap={4}
              style={{
                height: 41,
                paddingInlineStart: 10,
                paddingInlineEnd: 4,
                border: '1px solid var(--sf-border)',
                borderRadius: 'var(--sf-radius)',
              }}
            >
              {hex ? (
                <Text
                  className="sf-tnum"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontFamily: 'var(--sf-font-mono)',
                    fontSize: HEX_FONT_SIZE,
                    color: 'var(--sf-text-secondary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {hex}
                </Text>
              ) : (
                <Skeleton height={12} radius="sm" style={{ flex: 1 }} />
              )}

              <ActionIcon
                variant="subtle"
                color="gray"
                size={32}
                disabled={!hex}
                aria-label="Скопировать публичный номер"
                onClick={() => hex && copyValue(hex, 'Публичный номер')}
              >
                <IconCopy size={16} stroke={1.6} />
              </ActionIcon>
            </Group>

            <Group gap={6} wrap="nowrap" align="center">
              <Text size="xs" style={{ color: 'var(--sf-text-muted)' }}>
                Публичный UUID (HEX)
              </Text>

              {/* Подсказка, а не второй абзац под полем: объяснение к номеру
               * нужно один раз, и место ему — у подписи.
               * Текст выровнен по ширине: в узкой подсказке рваный правый
               * край мешал читать абзац как абзац */}
              <Tooltip
                label={<Box style={{ textAlign: 'justify' }}>{UUID_HINT}</Box>}
                multiline
                w={280}
                withArrow
                events={{ hover: true, focus: true, touch: true }}
              >
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size={18}
                  aria-label="Что такое публичный номер"
                >
                  <IconInfoCircle size={14} stroke={1.6} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        </Group>

        <Box>
          {/* Черта сверху отделяет строки паспорта от номера с кодом: без неё
           * роль липла к подписи поля номера */}
          <Divider />

          <PassportRow
            icon={<IconShield size={18} stroke={1.6} />}
            label="Роль на портале"
            /* Роль — обычная строка: плашка придавала ей вес действия,
             * а роль — такое же поле паспорта, как дата регистрации */
            value={<Text size="sm">{ROLE}</Text>}
          />

          <Divider />

          <PassportRow
            icon={<IconCalendar size={18} stroke={1.6} />}
            label="Дата регистрации"
            value={
              <Text size="sm" className="sf-tnum">
                {REGISTERED_AT}
              </Text>
            }
          />
        </Box>

        {/* Пояснение к коду: подложка тоном поля, а не текст в воздухе —
         * иначе примечание читается как ещё одна строка данных */}
        <Group
          wrap="nowrap"
          gap="sm"
          align="flex-start"
          style={{
            backgroundColor: 'var(--mantine-color-field-light)',
            borderRadius: 'var(--sf-radius)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Box
            aria-hidden="true"
            style={{ display: 'flex', color: 'var(--sf-field)' }}
          >
            <IconUsers size={22} stroke={1.6} />
          </Box>

          <Text size="xs" style={{ color: 'var(--sf-text-secondary)' }}>
            QR-код ведёт на страницу профиля игрока и помогает найти информацию о нём на портале.
          </Text>
        </Group>
      </Stack>
    </Pallet>
  );
}
