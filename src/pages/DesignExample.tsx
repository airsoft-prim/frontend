import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';

import { SiteLayout } from '../components/SiteLayout';

const surfaceSwatches = [
  { label: 'background', className: '', background: 'var(--sf-background)' },
  { label: 'surface', className: 'sf-surface', background: '' },
  { label: 'surface-elevated', className: 'sf-surface-elevated', background: '' },
];

const topics = [
  {
    title: 'Воскресная игра на «Артемовском»',
    category: 'Игры',
    color: 'field',
    status: 'Открыт набор',
    statusColor: 'success',
    meta: '12 участников · 3 часа назад',
  },
  {
    title: 'CQB-тренировка в ангаре',
    category: 'CQB',
    color: 'rust',
    status: 'Мест нет',
    statusColor: 'danger',
    meta: '24 участника · вчера',
  },
  {
    title: 'Нужен совет по приводу для новичка',
    category: 'Новичкам',
    color: 'steel',
    status: 'Обсуждение',
    statusColor: 'steel',
    meta: '7 ответов · 2 дня назад',
  },
];

/**
 * Страница проверки дизайн-системы: показывает бренд, статусы, формы,
 * иерархию поверхностей и таблицу в обеих схемах. Нужна как эталон при
 * разработке реальных разделов; удалять можно, когда появится замена.
 */
export function DesignExample() {
  return (
    <SiteLayout>
      <Title order={1} size="h3" mb={4}>
        Дизайн-система
      </Title>
      <Text className="sf-meta" mb="lg">
        Dark Field / Sand Field — проверка токенов дизайн-системы
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
        <Card>
          <Text fw={600} mb="sm">
            Бренд и действия
          </Text>
          <Group gap={6} mb="md">
            <Badge color="field">Активно</Badge>
            <Badge color="sand">Команда</Badge>
            <Badge color="rust">CQB</Badge>
            <Badge color="steel">Полигон</Badge>
          </Group>
          <Group gap="xs">
            <Button color="field">Создать тему</Button>
            <Button variant="default">Черновик</Button>
          </Group>
        </Card>

        <Card>
          <Text fw={600} mb="sm">
            Статусы
          </Text>
          <Group gap={6} mb="md">
            <Badge color="success">Набор открыт</Badge>
            <Badge color="warning">Мало мест</Badge>
            <Badge color="danger">Отменено</Badge>
          </Group>
          <Stack gap={2}>
            <Text size="sm">Основной текст — основной уровень</Text>
            <Text size="sm" className="sf-text-secondary">
              Вторичный текст — пояснения
            </Text>
            <Text size="sm" c="dimmed">
              Метаданные — время, счётчики
            </Text>
          </Stack>
        </Card>

        <Card>
          <Text fw={600} mb="sm">
            Формы
          </Text>
          <Stack gap="sm">
            <TextInput
              label="Название темы"
              placeholder="Например: игра 12 октября"
            />
            <Select
              label="Раздел"
              placeholder="Выберите раздел"
              data={['Игры', 'Команды', 'CQB', 'Барахолка']}
            />
            <Textarea
              label="Сообщение"
              placeholder="Текст сообщения"
              autosize
              minRows={2}
            />
          </Stack>
        </Card>
      </SimpleGrid>

      <Stack gap="sm" mb="xl">
        <Text fw={600}>Иерархия поверхностей</Text>
        <Group gap="md" align="stretch">
          {surfaceSwatches.map((swatch) => (
            <Stack
              key={swatch.label}
              className={swatch.className}
              gap={4}
              p="md"
              style={{
                flex: 1,
                minWidth: 160,
                background: swatch.background || undefined,
                border: '1px solid var(--sf-border)',
                borderRadius: 'var(--sf-radius)',
              }}
            >
              <Text size="sm" fw={600}>
                {swatch.label}
              </Text>
              <Text className="sf-meta">Отделима от фона</Text>
            </Stack>
          ))}
        </Group>
      </Stack>

      <Card>
        <Group justify="space-between" mb="sm">
          <Text fw={600}>Темы форума</Text>
          <Text className="sf-meta">
            Заголовок и метаданные разделены по весу и цвету
          </Text>
        </Group>
        <Divider mb="sm" />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Тема</Table.Th>
              <Table.Th>Раздел</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th>Активность</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {topics.map((topic) => (
              <Table.Tr key={topic.title}>
                <Table.Td>
                  <Text size="sm">{topic.title}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={topic.color}>{topic.category}</Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={topic.statusColor}>{topic.status}</Badge>
                </Table.Td>
                <Table.Td>
                  <Text className="sf-meta sf-tnum">{topic.meta}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </SiteLayout>
  );
}
