import { Modal, Text } from '@mantine/core';

import { ContactsList } from './ContactsList';

interface ContactsModalProps {
  opened: boolean;
  onClose: () => void;
}

/**
 * Контакты администрации: не отдельная страница, а окно поверх текущей —
 * ссылку в футере можно открыть с любого раздела, не теряя контекст.
 */
export function ContactsModal({ opened, onClose }: ContactsModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Контакты"
      centered
      radius="md"
    >
      <Text size="sm" mb="md" style={{ color: 'var(--sf-text-secondary)' }}>
        Связь по работе портала: аккаунт, публикации, данные, жалобы. За игры
        человек ниже не отвечает — по конкретной игре пишите её организатору.
      </Text>
      <ContactsList />
    </Modal>
  );
}
