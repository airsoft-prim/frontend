import { Box, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import heroImage from '../../content/images/banner.png';

/**
 * Баннер раздела: снимок на всю ширину, поверх — приветствие.
 *
 * Затемнение слева обязательно: снимок пятнами уходит в светлое (до 238 из
 * 255), и белый текст местами не дотягивает до AA. Плотная часть градиента
 * держится до 600px и растворяется к правому краю, оставляя кадр открытым.
 *
 * Высоту баннер не задаёт, а берёт по остатку колонки: строки игр и селектор
 * страниц держат свою высоту жёстко, поэтому при нехватке места сжимается
 * только баннер. Потолок 280px — чтобы баннер не съедал ленту, пол 200px —
 * под текст с кнопкой (192px) плюс запас. Баннер отдаёт высоту строкам игр,
 * поэтому его внутренний отступ компактнее обычного — `lg`, а не `xl`.
 */
export function HeroBanner() {
  return (
    <Card
      p={0}
      withBorder
      radius="lg"
      style={{
        overflow: 'hidden',
        /* Единственный сжимаемый блок колонки: он уступает высоту ленте */
        flex: '1 1 auto',
        minHeight: 200,
        maxHeight: 280,
      }}
    >
      <Box
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          /* Подложка видна, пока грузится снимок, и остаётся, если его нет */
          backgroundColor: 'var(--sf-field)',
          backgroundImage: `linear-gradient(
              90deg,
              rgba(12, 16, 12, 0.84) 0,
              rgba(12, 16, 12, 0.8) 600px,
              rgba(12, 16, 12, 0.28) 80%,
              rgba(12, 16, 12, 0.03) 100%
            ), url(${heroImage})`,
          backgroundSize: 'cover',
          /* Кадр по центру: снимок обрезается одинаково сверху и снизу */
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Stack gap="sm" p="lg" style={{ maxWidth: 552 }}>
          <Title order={2} c="white">
            Привет!
          </Title>

          <Text size="sm" c="rgba(255, 255, 255, 0.9)">
            Airsoft Prim — портал страйкболистов Приморского края. Здесь ты
            найдёшь игры, команды, оргкомитеты и единомышленников.
          </Text>

          <Group mt={4}>
            <Button
              component="a"
              href="/rules/"
              color="field"
              leftSection={<IconBook size={18} stroke={1.6} />}
            >
              Правила страйкбола
            </Button>
          </Group>
        </Stack>
      </Box>
    </Card>
  );
}
