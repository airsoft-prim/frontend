import { useState } from 'react';
import {
  Box,
  Card,
  Group,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import {
  IconArrowsSort,
  IconChevronRight,
  IconMapPin,
  IconUsers,
} from '@tabler/icons-react';

import { SkeletonChip } from '../SkeletonBits';

/** Иконки-подсказки в строке команды: оттенок muted, размер держат сами иконки */
const ROW_ICON_STYLE = {
  color: 'var(--sf-text-muted)',
  flexShrink: 0,
} as const;

/**
 * Название команды — основной текст строки, а не служебный: его полоса темнее
 * остальных заглушек, как основной текст против приглушённой мета-строки.
 */
const TITLE_BAR_STYLE = {
  backgroundColor: 'var(--sf-text-secondary)',
} as const;

/**
 * Эмблема команды — круг по высоте строки: растёт и сжимается вместе
 * с карточкой, как превью в строке событий. Потолка нет: эмблема задаёт
 * высоту содержимого строки, поэтому ниже её в карточке не остаётся полосы.
 */
const EMBLEM_STYLE = {
  flex: '0 0 auto',
  width: 'auto',
  height: '100%',
  minHeight: 88,
  aspectRatio: '1 / 1',
} as const;

/**
 * Вкладки списка: все команды и те, что набирают состав. Счётчиков у вкладок
 * нет — это данные API, а число у заголовка раздела было лишним: список
 * и так открыт целиком.
 */
const TABS = [
  { value: 'all', label: 'Все команды' },
  { value: 'recruiting', label: 'Ищут игроков' },
];

/**
 * Порядок списка. Рейтинг и число сыгранных игр из карточки убраны, поэтому
 * сортировка опирается только на то, что в строке видно: участие в играх,
 * численность состава, город и название.
 */
const SORT_OPTIONS = [
  { value: 'games', label: 'По участию в играх' },
  { value: 'players', label: 'По числу игроков' },
  { value: 'city', label: 'По городу' },
  { value: 'name', label: 'По названию' },
];

/**
 * Сколько команд показываем на странице: число фиксировано, селектора нет.
 * Семь строк заполняют контентную колонку на десктопе целиком — список
 * не оставляет пустоты перед селектором страниц.
 */
const PAGE_SIZE = 7;

/**
 * Число в строке команды: значение сверху, подпись под ним — как в макете.
 *
 * Подпись не зависит от данных, поэтому стоит настоящим текстом: по ней блок
 * читается и со скелетоном на месте значения. Высота полосы — кегль данных,
 * которые встанут на её место: 26 (`xxl`) — число участий.
 */
function StatBlock({ label }: { label: string }) {
  return (
    <Stack gap={4}>
      <Skeleton height={26} width={72} radius="sm" />
      <Text c="dimmed" size="md">
        {label}
      </Text>
    </Stack>
  );
}

/**
 * Расцветка команды — камуфляж и снаряжение: по ним выбирают, к кому вступать,
 * поэтому они стоят в середине строки и читаются раньше цифр у правого края.
 *
 * Подпись стоит перед значением — это подписанное поле, а не число с подписью
 * под ним: значение — плашка, как тег набора. Поле всегда одной строки, и ширина
 * плашки задана в пикселях: высота поля не зависит от ширины карточки, поэтому
 * строка не перестраивается при смене ширины окна.
 */
function ColorwayBlock({ label }: { label: string }) {
  return (
    <Group gap="sm" wrap="nowrap" align="center" justify="space-between">
      <Text c="dimmed" size="md">
        {label}
      </Text>
      <SkeletonChip width={72} height={24} />
    </Group>
  );
}

/**
 * Строка списка команд: эмблема, название с плашкой набора, подводка, город
 * с численностью состава, расцветки, два числа — организованные игры и участие
 * в играх — и переход на страницу команды.
 *
 * Ось строки задают настоящие элементы: иконки города и состава, подписи чисел
 * и «Расцветка …» и переход не зависят от данных, поэтому
 * стоят в разметке сразу — по ним строка читается и со скелетонами. Заглушки
 * остаются только на месте значений из API, и ширина полос задана в пикселях,
 * а не долями колонки.
 *
 * Тег «Команда» рядом с названием не стоит: раздел и так про команды, а тег
 * повторял заголовок страницы. Плашка набора остаётся — она несёт смысл
 * («Ищут игроков»), а не называет сущность.
 *
 * Карточка — ячейка сетки: высоту задаёт ряд, поэтому строка занимает её
 * целиком и закладка перехода идёт от границы до границы, а перенесённое
 * содержимое растягивает ряд, а не выходит за карточку. Поле строки закладка
 * читает из `--sf-row-padding`.
 */
function TeamRowSkeleton() {
  return (
    <Card
      withBorder
      padding="sm"
      /* Карточка — столбец: строка внутри растягивается на её высоту, иначе
       * содержимое липло бы к верхнему краю растянутой карточки */
      style={{
        display: 'flex',
        flexDirection: 'column',
        '--sf-row-padding': 'var(--mantine-spacing-sm)',
      }}
    >
      {/* Строку читают слева направо по одной оси, поэтому блоки выровнены
       * по центру — иначе подводка и мета-строка повисли бы у верхнего края */}
      <Group wrap="wrap" align="center" gap="md" style={{ flex: 1 }}>
        <Skeleton radius="50%" visibleFrom="sm" style={EMBLEM_STYLE} />

        {/* minWidth держит самую широкую полосу (подводка, 280px): колонка
         * не сжимает заглушки и не забирает место у расцветок в середине */}
        <Stack gap={8} style={{ minWidth: 260 }}>
          {/* Название и плашка набора стоят в одну строку: набор — свойство
           * команды, а не её характеристика в мета-строке */}
          <Group gap={8} wrap="nowrap" align="center">
            <Skeleton
              height={26}
              width={172}
              radius="sm"
              style={TITLE_BAR_STYLE}
            />
            <SkeletonChip width={104} height={20} />
          </Group>

          {/* Подводка — одна строка о том, как команда играет */}
          <Skeleton height={15} width={280} radius="sm" />

          {/* Город и состав идут парой: где команда и сколько в ней людей.
           * Численность показана без предела: «24 / 30» из макета сведено
           * к самому числу — набора сверх состава не бывает */}
          <Group gap={16} wrap="wrap" align="center">
            <Group gap={6} wrap="nowrap" align="center">
              <IconMapPin size={16} stroke={1.6} style={ROW_ICON_STYLE} />
              <Skeleton height={15} width={104} radius="sm" />
            </Group>

            <Group gap={6} wrap="nowrap" align="center">
              <IconUsers size={20} stroke={1.6} style={ROW_ICON_STYLE} />
              <Skeleton height={21} width={44} radius="sm" />
            </Group>
          </Group>
        </Stack>

        {/* Расцветки — посередине карточки: свободное место строки отдано им,
         * поэтому камуфляж и снаряжение держатся её середины */}
        <Group justify="center" style={{ flex: '1 1 0' }}>
          <Stack gap="sm">
            <ColorwayBlock label="Расцветка камуфляжа" />
            <ColorwayBlock label="Расцветка снаряжения" />
          </Stack>
        </Group>

        {/* Число и переход — один блок строки. Он переносится целиком,
         * поэтому закладка не остаётся на второй линии одна */}
        <Group
          wrap="nowrap"
          gap="md"
          align="center"
          style={{ alignSelf: 'stretch', marginInlineStart: 'auto' }}
        >
          {/* Два числа стоят парой и читаются слева направо: сначала сколько
           * игр команда организовала, потом в скольких участвовала. Промежуток
           * между ними больше обычного зазора: значения набраны крупно,
           * и вплотную они сливались бы в одно поле. Отступ справа отодвигает
           * цифры от черты закладки перехода */}
          <Group
            gap={40}
            wrap="nowrap"
            align="center"
            style={{ marginInlineEnd: 20 }}
          >
            <StatBlock label="Организовано игр" />
            <StatBlock label="Участий в играх" />
          </Group>

          {/* Переход на страницу команды — закладка у правого края карточки:
           * нажимается вся полоса во всю высоту, а не шеврон в 24px. Раздела
           * ещё нет — кнопка пока ничего не делает, но нажимается и озвучивается */}
          <UnstyledButton
            className="sf-row-action"
            aria-label="Открыть страницу команды"
          >
            <IconChevronRight size={24} stroke={1.6} />
          </UnstyledButton>
        </Group>
      </Group>
    </Card>
  );
}

/**
 * Лента команд: заголовок с сортировкой, вкладки, страница строк и селектор
 * страниц.
 *
 * Секция не обёрнута в карточку: строки — самостоятельные карточки на фоне
 * страницы, так список читается одним потоком.
 *
 * Порядок списка — единственное управление лентой: фильтр по типам
 * и переключатель вида убраны, листание offset-based, поэтому внизу стоит
 * обычный селектор страниц, а не «показать ещё». «Показывать по» заменено
 * фиксированным размером страницы.
 *
 * Высота: лента занимает контентную колонку целиком, поэтому селектор страниц
 * держится у её нижнего края (`marginTop: auto`), а не поднимается под
 * последнюю карточку, когда список короче колонки.
 */
export function TeamsFeed() {
  const [tab, setTab] = useState('all');
  const [sort, setSort] = useState('games');

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Заголовок и сортировка — одна строка: заголовок открывает раздел,
       * а порядок списка стоит у правого края, где его ищут */}
      <Group
        justify="space-between"
        align="center"
        wrap="wrap"
        gap="sm"
        mb="sm"
      >
        <Title order={3} size="h4">
          Команды
        </Title>

        <Select
          aria-label="Сортировка команд"
          data={SORT_OPTIONS}
          value={sort}
          onChange={(value) => setSort(value ?? 'games')}
          allowDeselect={false}
          leftSection={<IconArrowsSort size={16} stroke={1.6} />}
          /* Ширина — как у сортировки в разделе орг. групп: поля управления
           * в двух соседних разделах должны быть одной ширины */
          w={280}
        />
      </Group>

      <Tabs value={tab} onChange={(value) => setTab(value ?? 'all')} mb="sm">
        <Tabs.List>
          {TABS.map(({ value, label }) => (
            <Tabs.Tab key={value} value={value}>
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      {/* Раскладка строк — сетка в одну колонку, как у орг. групп:
       * `gridAutoRows` делит высоту колонки между строками поровну, поэтому
       * список заполняет её целиком, а перенесённая строка растягивает свой
       * ряд, а не выходит за границы карточки */}
      <Box
        style={{
          flex: '1 1 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gridAutoRows: 'minmax(0, 1fr)',
          gap: 'var(--mantine-spacing-sm)',
        }}
      >
        {Array.from({ length: PAGE_SIZE }, (_, row) => (
          <TeamRowSkeleton key={row} />
        ))}
      </Box>

      <Group justify="center" pt="sm" style={{ marginTop: 'auto' }}>
        {/* total — заглушка: столько страниц было в макете, реальное число
         * даст API вместе с данными списка */}
        <Pagination
          defaultValue={1}
          total={9}
          size="sm"
          siblings={1}
          withEdges={false}
        />
      </Group>
    </Box>
  );
}
