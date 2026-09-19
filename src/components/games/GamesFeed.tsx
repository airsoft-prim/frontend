import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronRight,
  IconClock,
  IconFilter,
  IconMapPin,
  IconUsers,
} from '@tabler/icons-react';

import { SkeletonChips } from '../SkeletonBits';

/** Иконки-подсказки в строке игры: оттенок muted, размер держат сами иконки */
const ROW_ICON_STYLE = {
  color: 'var(--sf-text-muted)',
  flexShrink: 0,
} as const;

/**
 * Название игры — основной текст строки, а не служебный: его полоса темнее
 * остальных заглушек, как основной текст против приглушённой мета-строки.
 */
const TITLE_BAR_STYLE = {
  backgroundColor: 'var(--sf-text-secondary)',
} as const;

/**
 * Подпись блока строки: «Организатор», «До начала», «Зарегистрировано».
 * Надписи не зависят от данных, поэтому стоят настоящим текстом; шаг шрифта
 * `md` — на `xs` и `sm` они терялись рядом с полосами значений.
 */
function RowLabel({ children }: { children: ReactNode }) {
  return (
    <Text c="dimmed" size="md">
      {children}
    </Text>
  );
}

/**
 * Строка списка игр: превью, дата старта, название с полигоном и временем,
 * организатор, сроки регистрации и переход на страницу игры.
 *
 * Ось строки задают настоящие элементы: подписи («Организатор», «До начала»,
 * «Зарегистрировано») и иконки не зависят от данных, поэтому стоят в разметке
 * сразу — по ним строка читается и со скелетонами. Заглушки остаются только
 * на месте значений из API, и ширина полос задана в пикселях, а не долями
 * колонки: реальные название игры или полигон не растягиваются на всю
 * ширину, поэтому и полосы должны быть короче.
 *
 * Свободное место строки делят поровну колонка информации и промежуток перед
 * цифрами: поэтому организатор стоит ближе к середине строки, а «До начала»
 * и регистрация держатся у правого края.
 *
 * Высота полосы-заглушки — это кегль данных, которые встанут на её место:
 * 26 (`xxl`) — название игры и обратный отсчёт, 21 (`xl`) — «32 / 60»,
 * 17 (`md`) — название организатора, 15 (`sm`) — тип организатора,
 * полигон и время. Подписи блоков тоже `md`, поэтому с подключением API
 * строка не перестроится.
 */
function GameRowSkeleton() {
  return (
    <Card withBorder padding="md">
      {/* Строку читают слева направо по одной оси, поэтому блоки выровнены
       * по центру — иначе короткие блоки справа повисают у верхнего края */}
      <Group wrap="wrap" align="center" gap="md">
        <Skeleton height={104} width={152} radius="sm" visibleFrom="sm" />

        {/* Дата старта стоит по верхнему краю превью — в один уровень
         * с кадром, а не по центру строки */}
        <Skeleton
          height={64}
          width={64}
          radius="sm"
          style={{ alignSelf: 'flex-start' }}
        />

        {/* minWidth держит самую широкую полосу (название, 172px): колонка
         * не сжимает заглушки, но и не занимает лишнего у блоков справа —
         * строка должна собираться в одну линию на десктопе */}
        <Stack gap={8} style={{ flex: 1, minWidth: 172 }}>
          <Skeleton
            height={26}
            width={172}
            radius="sm"
            style={TITLE_BAR_STYLE}
          />

          {/* Полигон и время начала — иконки те же, что будут у данных */}
          <Group gap={6} wrap="nowrap" align="center">
            <IconMapPin size={16} stroke={1.6} style={ROW_ICON_STYLE} />
            <Skeleton height={15} width={124} radius="sm" />
          </Group>

          <Group gap={6} wrap="nowrap" align="center">
            <IconClock size={16} stroke={1.6} style={ROW_ICON_STYLE} />
            <Skeleton height={15} width={84} radius="sm" />
          </Group>

          {/* Теги мелкие: их размер отдан названию — в строке оно важнее
           * длины тегов */}
          <SkeletonChips widths={[58, 42]} height={20} />
        </Stack>

        {/* Организатор: аватарка, подпись, тип организатора и название.
         * Блок стоит по верхнему краю строки — в один уровень с датой
         * старта и кадром */}
        <Group
          wrap="nowrap"
          gap="sm"
          align="flex-start"
          style={{ alignSelf: 'flex-start' }}
        >
          <Skeleton height={72} width={72} radius="50%" />
          <Stack gap={6}>
            <RowLabel>Организатор</RowLabel>

            {/* Тип организатора тоже приходит из API — «Орг. комитет»
             * или «Команда». Оба слова короткие, поэтому полоса под них одна
             * и короче полосы названия */}
            <Skeleton height={15} width={92} radius="sm" />

            <Skeleton height={17} width={124} radius="sm" />
          </Stack>
        </Group>

        {/* Промежуток перед цифрами забирает половину свободного места
         * строки: поэтому организатор встаёт ближе к её середине,
         * а цифры остаются у правого края */}
        <Box style={{ flex: 1, minWidth: 1 }} />

        {/* Цифры и переход — один блок строки. Он переносится целиком,
         * поэтому закладка не остаётся на второй линии одна */}
        <Group
          wrap="nowrap"
          gap="md"
          align="center"
          style={{ alignSelf: 'stretch', marginInlineStart: 'auto' }}
        >
          {/* Сроки и регистрация — двумя парами в одну строку: это главные
           * цифры карточки, и читаются они слева направо, одна за другой.
           * Пары разведены большим зазором: значения набраны крупно,
           * и вплотную они сливались бы в одно поле.
           * Отступ справа отодвигает цифры от черты закладки */}
          <Group
            gap={40}
            wrap="nowrap"
            align="flex-start"
            style={{ marginInlineEnd: 20 }}
          >
            <Stack gap={6}>
              <RowLabel>До начала</RowLabel>
              <Skeleton height={26} width={116} radius="sm" />
            </Stack>

            <Stack gap={6}>
              <RowLabel>Зарегистрировано</RowLabel>
              <Group gap={6} wrap="nowrap" align="center">
                <IconUsers size={20} stroke={1.6} style={ROW_ICON_STYLE} />
                <Skeleton height={21} width={70} radius="sm" />
              </Group>
            </Stack>
          </Group>

          {/* Переход на страницу игры — закладка у правого края карточки.
           * Нажимается вся закладка, а не только шеврон: по иконке в 24px
           * не попадали. Зона отделена чертой слева, идёт во всю высоту
           * карточки и выходит на её правый край (см. .sf-row-action).
           * Раздела ещё нет — кнопка пока ничего не делает, но нажимается
           * и озвучивается как действие */}
          <UnstyledButton
            className="sf-row-action"
            aria-label="Открыть страницу игры"
          >
            <IconChevronRight size={24} stroke={1.6} />
          </UnstyledButton>
        </Group>
      </Group>
    </Card>
  );
}

const TABS = [
  { value: 'open', label: 'Открыта регистрация' },
  { value: 'announced', label: 'Анонсированы' },
  { value: 'past', label: 'Проведены' },
];

/** Сколько игр показываем на странице */
const PAGE_SIZE = 5;

/**
 * Лента игр: заголовок, вкладки, страница строк и селектор страниц.
 *
 * Секция не обёрнута в карточку: строки — самостоятельные карточки
 * на фоне страницы, так список читается одним потоком.
 *
 * Листание offset-based, поэтому внизу стоит обычный селектор страниц,
 * а не «показать ещё»: селектор компактный (без кнопок первого и последнего
 * края, с одним соседом), чтобы отдать высоту строкам.
 *
 * Прокрутки у списка нет, а высота зафиксирована: на странице ровно
 * `PAGE_SIZE` строк. Сжимается под нехватку места баннер, а не строки —
 * поэтому лента не даёт себя ужать (`flexShrink: 0`) и не теряет строк
 * за границей блока.
 */
export function GamesFeed() {
  const [tab, setTab] = useState('open');

  return (
    <Box style={{ flexShrink: 0 }}>
      <Title order={3} size="h4" mb="sm">
        Игры
      </Title>

      <Tabs value={tab} onChange={(value) => setTab(value ?? 'open')}>
        <Group
          justify="space-between"
          align="center"
          gap="sm"
          mb="sm"
          wrap="nowrap"
        >
          <Tabs.List>
            {TABS.map(({ value, label }) => (
              <Tabs.Tab key={value} value={value}>
                {label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Button
            variant="default"
            size="xs"
            leftSection={<IconFilter size={14} stroke={1.6} />}
          >
            Фильтры
          </Button>
        </Group>
      </Tabs>

      <Stack gap="sm">
        {Array.from({ length: PAGE_SIZE }, (_, row) => (
          <GameRowSkeleton key={row} />
        ))}
      </Stack>

      <Group justify="center" pt="sm">
        <Pagination
          defaultValue={1}
          total={12}
          size="sm"
          siblings={1}
          withEdges={false}
        />
      </Group>
    </Box>
  );
}
