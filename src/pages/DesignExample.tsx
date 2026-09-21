import {
  Badge,
  Box,
  Button,
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
import {
  IconArrowRight,
  IconForms,
  IconLayersSubtract,
  IconPalette,
  IconQuote,
  IconTable,
  IconTextSize,
} from '@tabler/icons-react';

import { MarkdownText } from '../components/MarkdownText';
import { Pallet, PalletAction } from '../components/Pallet';
import { SiteLayout } from '../components/SiteLayout';

/**
 * Иконки шапок карточек-разделов. Кегль заголовка здесь `md` (см. Pallet),
 * поэтому иконка крупнее строчной: пара «иконка + заголовок» читается шапкой
 * блока, а не строкой списка.
 */
const SECTION_ICON = { size: 22, stroke: 1.6 } as const;

/**
 * Плашка проверки поверхности: подложка приходит либо токеном фона, либо
 * утилитой `.sf-surface` / `.sf-surface-elevated` (у приподнятой вместе
 * с тенью). Граница и скругление у всех плашек общие — по ним и видно,
 * что уровни отличаются только подложкой, а не формой.
 */
const SWATCH_STYLE = {
  border: '1px solid var(--sf-border)',
  borderRadius: 'var(--sf-radius)',
} as const;

/** Уровни поверхностей приложения: фон, карточка, приподнятая карточка */
const surfaceSwatches = [
  {
    label: 'background',
    className: undefined,
    background: 'var(--sf-background)',
  },
  { label: 'surface', className: 'sf-surface', background: undefined },
  {
    label: 'surface-elevated',
    className: 'sf-surface-elevated',
    background: undefined,
  },
];

/**
 * Шкала скруглений. Пилюля стоит последней: в системе она для бейджей
 * и мелких меток, а не для карточек.
 */
const radiusTokens = [
  { label: 'radius-sm', value: 'var(--sf-radius-sm)' },
  { label: 'radius', value: 'var(--sf-radius)' },
  { label: 'radius-lg', value: 'var(--sf-radius-lg)' },
  { label: 'radius-pill', value: 'var(--sf-radius-pill)' },
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
 * Текст игрока для проверки `.sf-markdown`. Собирается из тех же блоков, что
 * приходят из профиля: выделение приветствия, абзацы и цитата с подписью
 * автора (см. components/profile/ProfileAbout.tsx).
 */
const PLAYER_TEXT = `**Привет!** Играю с 2015 года, в основном на «Артемовском» и в ангаре.

Текст профиля приходит разметкой — абзацы, списки и цитаты задаёт сам игрок,
а не страница.

> Игра — это в первую очередь люди, а не техника.
>
> — Олег, команда «Вепрь»`;

/** Колонка текста: строка длиннее 42rem читается плохо */
const MEASURE = '42rem';

/**
 * Страница проверки дизайн-системы: паллетка, бренд и семантические цвета,
 * уровни текста, формы, поверхности и скругления, таблица и текст игрока
 * в Markdown — в обеих схемах. Служит эталоном при разработке разделов;
 * удалять можно, когда появится замена.
 *
 * Разделы собраны из `Pallet` — базовой карточки страницы, поэтому страница
 * показывает не только цвета, но и то, из чего собирается раздел: шапка
 * с иконкой, черта под заголовком, действие в подвале.
 */
export function DesignExample() {
  return (
    <SiteLayout>
      {/* Каркас выделяет единственный блок контента (строка `1fr`), поэтому
       * содержимое собрано в один Stack. Список из нескольких блоков подряд
       * каркас принял бы за строки сетки: первая строка забрала бы свободную
       * высоту окна, и заголовок оторвался бы от разделов. */}
      <Stack gap="md">
        <Box>
          <Title order={1} size="h3" mb={4}>
            Дизайн-система
          </Title>
          <Text className="sf-meta">
            Dark Field / Sand Field — проверка токенов дизайн-системы
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          <Pallet
            title="Бренд и действия"
            titleSize="md"
            icon={<IconPalette {...SECTION_ICON} />}
          >
            <Stack gap="sm">
              <Group gap={6}>
                <Badge color="field">Активно</Badge>
                <Badge color="sand">Команда</Badge>
                <Badge color="rust">CQB</Badge>
                <Badge color="steel">Полигон</Badge>
              </Group>

              <Group gap="xs">
                <Button color="field">Создать тему</Button>
                <Button variant="default">Черновик</Button>
              </Group>

              {/* Действия события и разрушающие: цвет здесь несёт смысл,
               * поэтому вариант тонированный — главным в блоке остаётся Field */}
              <Group gap="xs">
                <Button color="rust" variant="light">
                  Записаться на игру
                </Button>
                <Button color="danger" variant="light">
                  Отменить игру
                </Button>
              </Group>
            </Stack>
          </Pallet>

          <Pallet
            title="Статусы и текст"
            titleSize="md"
            icon={<IconTextSize {...SECTION_ICON} />}
          >
            <Stack gap="sm">
              <Group gap={6}>
                <Badge color="success">Набор открыт</Badge>
                <Badge color="warning">Мало мест</Badge>
                <Badge color="danger">Отменено</Badge>
              </Group>

              {/* Три уровня текста: основной, вторичный и метаданные.
               * Вторичный уровень в Mantine своего имени не имеет, поэтому
               * задаётся классом; метаданные — не `c="dimmed"`, а `.sf-meta`:
               * размер и цвет мета-строки держит дизайн-система */}
              <Stack gap={2}>
                <Text size="sm">Основной текст — основной уровень</Text>
                <Text size="sm" className="sf-text-secondary">
                  Вторичный текст — пояснения
                </Text>
                <Text className="sf-meta">Метаданные — время, счётчики</Text>
                <Text className="sf-meta sf-tnum">
                  12 участников · 3 часа назад
                </Text>
              </Stack>
            </Stack>
          </Pallet>

          <Pallet
            title="Формы"
            titleSize="md"
            icon={<IconForms {...SECTION_ICON} />}
          >
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
          </Pallet>
        </SimpleGrid>

        <Pallet
          title="Поверхности и скругления"
          titleSize="md"
          icon={<IconLayersSubtract {...SECTION_ICON} />}
        >
          <Stack gap="md">
            {/* Сетка, а не ряд с `flex: 1`: на узком экране последняя плашка
             * растягивалась на всю ширину и переставала быть равной соседям */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
              {surfaceSwatches.map((swatch) => (
                <Stack
                  key={swatch.label}
                  className={swatch.className}
                  gap={4}
                  p="md"
                  style={{ ...SWATCH_STYLE, background: swatch.background }}
                >
                  <Text size="sm" fw={600}>
                    {swatch.label}
                  </Text>
                  <Text className="sf-meta">Отделима от фона</Text>
                </Stack>
              ))}
            </SimpleGrid>

            <Box>
              <Text className="sf-meta" mb={6}>
                Границы берут цвет `--sf-border`, скругления — общую шкалу
              </Text>
              <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
                {radiusTokens.map((token) => (
                  <Stack key={token.label} gap={4}>
                    <Text className="sf-meta">{token.label}</Text>
                    <Box
                      style={{
                        height: 44,
                        border: '1px solid var(--sf-border)',
                        borderRadius: token.value,
                      }}
                    />
                  </Stack>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Pallet>

        <Pallet
          title="Темы форума"
          titleSize="md"
          icon={<IconTable {...SECTION_ICON} />}
          divider
        >
          <Text className="sf-meta" mb="xs">
            Заголовок и метаданные разделены по весу и цвету
          </Text>

          {/* Столбцы не сжимаются ниже своего содержимого, поэтому на узком
           * экране таблица прокручивается вбок внутри карточки: иначе
           * она задала бы ширину страницы и раздел ушёл бы за окно.
           * `minWidth={0}` — пол задаёт сама таблица, а не число в разметке */}
          <Table.ScrollContainer type="native" minWidth={0}>
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
          </Table.ScrollContainer>

          {/* Действие «Все …» в подвале паллетки. Раздела с темами ещё нет,
           * поэтому действие остаётся кнопкой-заглушкой без `href` */}
          <Group justify="center" mt="md">
            <PalletAction icon={<IconArrowRight size={14} stroke={1.6} />}>
              Все темы
            </PalletAction>
          </Group>
        </Pallet>

        <Pallet
          title="Текст игрока"
          titleSize="md"
          icon={<IconQuote {...SECTION_ICON} />}
        >
          <Box style={{ maxWidth: MEASURE }}>
            <MarkdownText markdown={PLAYER_TEXT} />
          </Box>
        </Pallet>
      </Stack>
    </SiteLayout>
  );
}
