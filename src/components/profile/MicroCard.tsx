import { Avatar, Card, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

interface MicroCardProps {
  /** Название: игра, команда или орг. группа */
  title: string;
  /** Вторая строка: даты проведения игры или роль в коллективе */
  note: string;
  /** Адрес аватара из API; без него круг показывает инициалы названия */
  avatarUrl?: string;
  /** Подпись закладки: куда она ведёт — «Открыть страницу команды» */
  actionLabel: string;
}

/**
 * Микрокарточка списка в профиле: аватар, название, вторая строка и закладка
 * перехода.
 *
 * Карточки идут сеткой по нескольку в ряд, поэтому содержимое сжато: обе
 * строки занимают по одной и длинные обрезаются многоточием — перенос сделал
 * бы карточки разной высоты и сетка поехала бы.
 *
 * Закладка с шевроном — как у строки игры в разделе (см. games/GamesFeed):
 * зона отделена чертой слева, идёт во всю высоту карточки и выходит на её
 * правый край (см. `.sf-row-action`). Нажимается вся зона, а не шеврон
 * в 24px. Страниц разделов ещё нет, поэтому закладка пока ничего не открывает,
 * но нажимается и озвучивается как действие.
 *
 * Аватар — инициалы названия: у игры и у команды нет лица, а снимок придёт
 * с API (тогда его покажет `src`).
 */
export function MicroCard({
  title,
  note,
  avatarUrl,
  actionLabel,
}: MicroCardProps) {
  return (
    <Card
      withBorder
      padding="xs"
      /* Переменные говорят закладке, от чего считать её поля и какой она
       * ширины: отступ здесь меньше обычного, а обычные 44px заняли бы
       * в мелкой карточке четверть. 24px — нижняя граница площади нажатия
       * (WCAG 2.5.8), ниже опускать нельзя (см. .sf-row-action) */
      style={{
        flex: '0 0 auto',
        '--sf-row-padding': 'var(--mantine-spacing-xs)',
        '--sf-row-action-width': '24px',
      }}
    >
      <Group gap="xs" wrap="nowrap" align="center">
        <Avatar
          src={avatarUrl}
          name={title}
          size={40}
          radius="50%"
          color="field"
          style={{ flex: '0 0 auto' }}
        />

        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} lineClamp={1}>
            {title}
          </Text>
          <Text
            size="xs"
            lineClamp={1}
            style={{ color: 'var(--sf-text-muted)' }}
          >
            {note}
          </Text>
        </Stack>

        <UnstyledButton className="sf-row-action" aria-label={actionLabel}>
          <IconChevronRight size={20} stroke={1.6} />
        </UnstyledButton>
      </Group>
    </Card>
  );
}
