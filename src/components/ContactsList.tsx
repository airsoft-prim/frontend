import { Anchor, Table, Text } from '@mantine/core';
import {
  IconBrandTelegram,
  IconId,
  IconMail,
  IconMessage,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';

import { callsign, email, max, name, phone, telegram } from '../config/contacts';

/** Принимаем и @ник, и полный адрес: ссылку собираем только для первого */
const telegramHref = (value: string) =>
  value.startsWith('http') ? value : `https://t.me/${value.replace(/^@/, '')}`;

/** MAX-PROFILE без схемы не угадываем — тогда значение просто текстом */
const optionalHref = (value: string) =>
  value.startsWith('http') ? value : undefined;

/** В tel: уходят только цифры и ведущий плюс */
const phoneHref = (value: string) => `tel:${value.replace(/[^\d+]/g, '')}`;

interface ContactRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: typeof IconUser;
}

const CONTACTS: ContactRow[] = [];

CONTACTS.push({ label: 'Имя', value: name, icon: IconUser });
CONTACTS.push({ label: 'Позывной', value: callsign, icon: IconId });
CONTACTS.push({
  label: 'Почта',
  value: email,
  href: `mailto:${email}`,
  icon: IconMail,
});
CONTACTS.push({
  label: 'Telegram',
  value: telegram,
  href: telegramHref(telegram),
  external: true,
  icon: IconBrandTelegram,
});

if (max) {
  CONTACTS.push({
    label: 'MAX',
    value: max,
    href: optionalHref(max),
    external: true,
    icon: IconMessage,
  });
}

CONTACTS.push({
  label: 'Телефон',
  value: phone,
  href: phoneHref(phone),
  icon: IconPhone,
});

/**
 * Контакты администрации списком: иконка, подпись, значение.
 * Данные приходят из переменных окружения (см. src/config/contacts.ts и
 * .env.example), почта, мессенджер и телефон — кликабельные ссылки.
 */
export function ContactsList() {
  return (
    <Table
      horizontalSpacing="xs"
      verticalSpacing="xs"
      highlightOnHover={false}
      withRowBorders
    >
      <Table.Tbody>
        {CONTACTS.map(({ label, value, href, external, icon: Icon }) => (
          <Table.Tr key={label}>
            <Table.Td w={28}>
              <Icon
                size={18}
                stroke={1.6}
                aria-hidden="true"
                style={{ color: 'var(--sf-text-muted)', display: 'block' }}
              />
            </Table.Td>
            <Table.Td>
              <Text size="xs" style={{ color: 'var(--sf-text-muted)' }}>
                {label}
              </Text>
            </Table.Td>
            <Table.Td>
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
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
