import { Anchor, Box, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { callsign } from '../config/contacts';
import { ContactsModal } from './ContactsModal';

/** Отдельные страницы-документы */
const PAGE_LINKS = [
  { label: 'Правила использования', href: '/agreement/' },
  { label: 'Политика конфиденциальности', href: '/policy/' },
];

/**
 * Ссылка на страницу-пример нужна только во время разработки:
 * `import.meta.env.DEV` вырезается при сборке, поэтому в бою её нет.
 */
const DEV_LINKS = import.meta.env.DEV
  ? [{ label: 'Дизайн-система', href: '/design-example/' }]
  : [];

const linkStyle = { color: 'var(--sf-text-secondary)' };

export function SiteFooter() {
  /* Год считаем, а не пишем руками: иначе футер устареет сам по себе */
  const year = new Date().getFullYear();
  const [contactsOpened, { open: openContacts, close: closeContacts }] =
    useDisclosure(false);

  return (
    <Box
      component="footer"
      style={{
        /* Футер всегда внизу окна: липнет к нижнему краю, пока документ
         * прокручивается. Sticky, а не fixed — иначе полосе контента нужен
         * отступ ровно в высоту футера, а он меняется на узких экранах:
         * в один столбец футер занимает три строки. */
        position: 'sticky',
        bottom: 0,
        zIndex: 'var(--mantine-z-index-app)',
        backgroundColor: 'var(--sf-surface)',
        borderTop: '1px solid var(--sf-border)',
      }}
    >
      <Box
        className="sf-grid-3col sf-grid-3col-stack"
        style={{
          paddingInline: 'var(--sf-gutter)',
          paddingBlock: 'var(--mantine-spacing-md)',
        }}
      >
        <Text size="xs" style={linkStyle}>
          © {year} Airsoft Prim
        </Text>

        <Group gap="lg" justify="center">
          {PAGE_LINKS.map(({ label, href }) => (
            <Anchor
              key={href}
              href={href}
              size="xs"
              underline="hover"
              style={linkStyle}
            >
              {label}
            </Anchor>
          ))}

          <Anchor
            component="button"
            type="button"
            size="xs"
            underline="hover"
            onClick={openContacts}
            style={linkStyle}
          >
            Контакты
          </Anchor>

          {DEV_LINKS.map(({ label, href }) => (
            <Anchor
              key={href}
              href={href}
              size="xs"
              underline="hover"
              style={{ color: 'var(--sf-accent)' }}
            >
              {label}
            </Anchor>
          ))}
        </Group>

        <Group justify="flex-end">
          {/* Автор подписи — тот же CONTACTS_CALLSIGN, что и «Позывной»
              в окне контактов: строка живёт в одном месте (.env) */}
          <Text size="xs" style={linkStyle}>
            Made by{' '}
            <span style={{ color: 'var(--sf-accent)', fontWeight: 600 }}>
              {callsign}
            </span>
          </Text>
        </Group>
      </Box>

      <ContactsModal opened={contactsOpened} onClose={closeContacts} />
    </Box>
  );
}
