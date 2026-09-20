import { ActionIcon, Avatar, Box, Card, Group, Tabs, Text, Tooltip } from '@mantine/core';
import {
  IconCalendarCheck,
  IconDots,
  IconMapPin,
  IconRosetteDiscountCheckFilled,
  IconShield,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

import defaultAvatar from '../../content/images/user-avatar-default.png';
import { AVATAR_URL, CALLSIGN, CITY, COVER_URL, FULL_NAME, STATUS } from './demo';

/**
 * Высота обложки. Полоса заметно шире своей высоты (154px на карточке
 * в 1050px): обложка — фон шапки профиля, а не самостоятельная картинка,
 * поэтому она не отбирает высоту у содержимого под ней.
 */
const COVER_HEIGHT = 154;

/** Аватар — крупный круг: он якорь шапки, вокруг него стоят имя и статус */
const AVATAR_SIZE = 148;

/**
 * Насколько аватар заходит на обложку. Четверть его высоты: круг читается
 * стоящим на обложке, но не перекрывает её середину.
 */
const AVATAR_OVERLAP = 38;

/**
 * Скругление верхних углов листа содержимого — и ровно на столько же лист
 * накрывает низ обложки. Число совпадает с шагом шкалы `--sf-radius-lg`.
 *
 * Скругление показывает обложку в углах: полоса читается слоем позади
 * содержимого, а не подложкой с прямой чертой поперёк карточки.
 */
const SHEET_RADIUS = 12;

/**
 * Кольцо вокруг аватара, цветом поверхности карточки. Оно отделяет круг
 * от обложки: аватар читается вырезанным из полосы, а не наклеенным на неё.
 * Толщина с запасом к обводкам интерфейса: кольцо здесь не граница,
 * а зазор между кругом и полосой.
 */
const AVATAR_RING = 6;

/**
 * Отступ блока с позывным от верхнего края шапки. Аватар заходит на обложку
 * на `AVATAR_OVERLAP`, и ещё 10px — воздух до нижней границы полосы: без него
 * позывной оказывается на баннере.
 */
const TEXT_OFFSET = AVATAR_OVERLAP + 10;

/**
 * Нижний воздух шапки до полосы вкладок. Больше базового шага `xl` на 9px:
 * на столько паспорт в правой колонке выше шапки, и без доводки низы
 * карточек не сходятся по высоте.
 */
const HEAD_PADDING_BOTTOM = 41;

/**
 * Заливка обложки по умолчанию. Снимок игрока приходит вместе с данными,
 * а до тех пор полоса залита градиентом поля: грузить пока нечего, поэтому
 * заглушка-скелетон здесь читалась бы ожиданием, которого не будет.
 *
 * Приём тот же, что у баннера раздела игр (см. HeroBanner): подложка держит
 * цвет, снимок ложится поверх, когда URL появится. Отличие одно: на обложке
 * профиля нет текста, поэтому затемнять её не нужно — градиент здесь сам
 * баннер, а не подложка под подпись.
 */
const COVER_FILL =
  'linear-gradient(120deg, var(--mantine-color-field-8) 0%, var(--mantine-color-field-5) 100%)';

/**
 * Подсказка к знаку подтверждения. Метка говорит, что аккаунт отмечен, но не
 * объясняет чем: это делает подсказка по наведению и по фокусу с клавиатуры.
 */
const VERIFIED_HINT = 'Этот пользователь зарегистрирован на портале';

/**
 * Шапка профиля: обложка, аватар, позывной со статусом и вкладки разделов.
 *
 * Карточка без собственных полей (`p={0}`): обложка и полоса вкладок идут
 * от края до края, а внутренние отступы задают блоки. Так же собран баннер
 * раздела игр — полноширинный кадр не терпит полей карточки.
 *
 * Содержимое лежит на «листе» со скруглёнными верхними углами: лист накрывает
 * низ обложки, и в углах полоса видна — шапка читается слоями, а не одной
 * плоскостью.
 *
 * Вкладки — часть шапки, поэтому `Tabs.List` живёт здесь, а панели рисует
 * ProfileMain: список и содержимое связаны контекстом Tabs, но стоят
 * в разных карточках.
 *
 * Данные — из модуля макета (см. demo.ts): позывной, статус, имя и город
 * придут вместе с API. Обложка ждёт снимка игрока — до тех пор её заливает
 * градиент поля; в круге аватара тоже стоит стандартный аватар портала,
 * пока API не отдал ссылку на снимок.
 */
export function ProfileHero() {
  return (
    <Card p={0} style={{ flex: '0 0 auto', overflow: 'hidden' }}>
      {/* Обложка: снимок игрока придёт вместе с данными, а до тех пор полоса
       * залита градиентом поля — так же устроен баннер раздела игр.
       * Снимок, когда он появится, ляжет поверх заливки.
       * Полоса на радиус длиннее своей видимой высоты: низ обложки уходит
       * под лист содержимого */}
      <Box
        style={{
          height: COVER_HEIGHT + SHEET_RADIUS,
          backgroundColor: 'var(--sf-field)',
          backgroundImage: COVER_URL
            ? `url(${COVER_URL}), ${COVER_FILL}`
            : COVER_FILL,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Лист содержимого: накрывает низ обложки и закругляет верхние углы.
       * Цвет — поверхность карточки, то есть в углах видна не она, а обложка */}
      <Box
        style={{
          marginTop: -SHEET_RADIUS,
          borderTopLeftRadius: SHEET_RADIUS,
          borderTopRightRadius: SHEET_RADIUS,
          backgroundColor: 'var(--sf-surface)',
        }}
      >
        {/* Блок сдвинут вверх отрицательным полем: аватар стоит на обложке,
         * а не под ней. Нижнее поле держит воздух до полосы вкладок —
         * там проходит граница, и вплотную к ней текст не читается */}
        <Box px="md" pb={HEAD_PADDING_BOTTOM} style={{ marginTop: -AVATAR_OVERLAP }}>
          <Group wrap="nowrap" align="center" gap="lg">
            {/* Кольцо цветом поверхности отделяет круг от обложки: аватар
             * читается вырезанным из полосы, а не наклеенным на неё.
             * Снимок придёт вместе с данными; пока ссылки нет, в круге стоит
             * стандартный аватар портала */}
            <Avatar
              src={AVATAR_URL ?? defaultAvatar}
              alt=""
              size={AVATAR_SIZE}
              radius={AVATAR_SIZE / 2}
              style={{
                flex: '0 0 auto',
                boxShadow: `0 0 0 ${AVATAR_RING}px var(--sf-surface)`,
              }}
            />

            {/* Текст стоит ниже обложки: блок выровнен по верху и отодвинут
             * на её высоту, поэтому позывной не залезает на баннер */}
            <Box
              style={{
                flex: 1,
                minWidth: 0,
                alignSelf: 'flex-start',
                marginTop: TEXT_OFFSET,
              }}
            >
              <Group gap="xs" wrap="nowrap">
                <Text fw={700} size="xxl" lh={1.15}>
                  {CALLSIGN}
                </Text>

                {/* Знак подтверждения стоит у позывного, а не отдельной строкой:
                 * это признак аккаунта, а не ещё одно поле профиля.
                 * Знак рассказывает о себе подсказкой и берёт фокус с клавиатуры:
                 * без этого метка читалась бы украшением без смысла */}
                <Tooltip
                  label={VERIFIED_HINT}
                  withArrow
                  events={{ hover: true, focus: true, touch: true }}
                >
                  <IconRosetteDiscountCheckFilled
                    size={20}
                    role="img"
                    tabIndex={0}
                    aria-label={VERIFIED_HINT}
                    style={{
                      flex: '0 0 auto',
                      color: 'var(--sf-field)',
                      borderRadius: 4,
                    }}
                  />
                </Tooltip>
              </Group>

              {/* Статус — реплика самого игрока, поэтому в кавычках: без них
               * строка читается подписью портала, а не словами игрока */}
              <Text size="sm" mt={6} style={{ color: 'var(--sf-text-secondary)' }}>
                «{STATUS}»
              </Text>

              <Group gap="lg" mt="sm" wrap="nowrap">
                <Text size="sm">{FULL_NAME}</Text>

                <Group gap={6} wrap="nowrap">
                  <IconMapPin
                    size={16}
                    stroke={1.6}
                    aria-hidden="true"
                    style={{ flex: '0 0 auto', color: 'var(--sf-text-muted)' }}
                  />
                  <Text size="sm" style={{ color: 'var(--sf-text-secondary)' }}>
                    {CITY}
                  </Text>
                </Group>
              </Group>
            </Box>

            {/* Действия профиля: пунктов пока нет — ни жалобы, ни подписки
             * на игрока в портале не существует, поэтому кнопка пустая.
             * Как только действия появятся, она станет меню */}
            <ActionIcon
              size={38}
              aria-label="Действия профиля"
              style={{ flex: '0 0 auto' }}
            >
              <IconDots size={20} stroke={1.6} />
            </ActionIcon>
          </Group>
        </Box>
      </Box>

      <Tabs.List className="sf-profile-tabs">
        <Tabs.Tab
          className="sf-profile-tab"
          value="about"
          leftSection={<IconUser size={18} stroke={1.6} />}
        >
          Об игроке
        </Tabs.Tab>

        <Tabs.Tab
          className="sf-profile-tab"
          value="games"
          leftSection={<IconCalendarCheck size={18} stroke={1.6} />}
        >
          Игры
        </Tabs.Tab>

        <Tabs.Tab
          className="sf-profile-tab"
          value="teams"
          leftSection={<IconShield size={18} stroke={1.6} />}
        >
          Команды
        </Tabs.Tab>

        <Tabs.Tab
          className="sf-profile-tab"
          value="committees"
          leftSection={<IconUsers size={18} stroke={1.6} />}
        >
          Орг. Группы
        </Tabs.Tab>
      </Tabs.List>
    </Card>
  );
}
