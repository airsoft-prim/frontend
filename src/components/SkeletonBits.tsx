import { Group, Skeleton } from '@mantine/core';

interface SkeletonLinesProps {
  /** Ширины строк: последняя обычно короче, как в реальном тексте */
  widths?: (string | number)[];
  height?: number;
}

/**
 * Строки текста-заглушки. Нужны, пока нет API: разметка страницы уже
 * на месте, а данные подставит тот, кто подключит бэкенд.
 */
export function SkeletonLines({
  widths = ['70%', '45%'],
  height = 10,
}: SkeletonLinesProps) {
  return (
    <>
      {widths.map((width, index) => (
        <Skeleton key={index} height={height} width={width} radius="sm" />
      ))}
    </>
  );
}

interface SkeletonChipProps {
  width?: number;
  /**
   * Высота плашки: по умолчанию 24px — размер бейджа под текст 15px.
   * Строка игры берёт меньше, потому что место в её колонке отдано названию.
   */
  height?: number;
}

/** Плашка-бейдж: теги игры, роли, статусы */
export function SkeletonChip({ width = 64, height = 24 }: SkeletonChipProps) {
  return <Skeleton height={height} width={width} radius="xl" />;
}

/** Несколько плашек подряд — например, теги «Сценарная игра», «Дневная» */
export function SkeletonChips({
  widths,
  height,
}: {
  widths: number[];
  height?: number;
}) {
  return (
    <Group gap={8}>
      {widths.map((width, index) => (
        <SkeletonChip key={index} width={width} height={height} />
      ))}
    </Group>
  );
}
