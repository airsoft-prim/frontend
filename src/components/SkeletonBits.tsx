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

/** Плашка-бейдж: теги игры, роли, статусы */
export function SkeletonChip({ width = 64 }: { width?: number }) {
  return <Skeleton height={24} width={width} radius="xl" />;
}

/** Несколько плашек подряд — например, теги «Сценарная игра», «Дневная» */
export function SkeletonChips({ widths }: { widths: number[] }) {
  return (
    <Group gap={8}>
      {widths.map((width, index) => (
        <SkeletonChip key={index} width={width} />
      ))}
    </Group>
  );
}
