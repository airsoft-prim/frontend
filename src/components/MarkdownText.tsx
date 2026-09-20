import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mantine/core';

interface MarkdownTextProps {
  /** Разметка текста — то, что написал игрок в поле профиля */
  markdown: string;
}

/**
 * Текст игрока, свёрстанный из Markdown.
 *
 * От `MarkdownDocument` отличается кеглем и ритмом: там документ раздела
 * (кегль `md`, интерлиньяж 1.7, отбивка блоков), здесь — реплика в карточке:
 * тот же шаг, что у обычного текста карточки. Оформление — класс
 * `.sf-markdown` по тегам: Markdown отдаёт обычные `p`, `ul`, `blockquote`,
 * до которых props Mantine не достают (см. sf-document).
 *
 * HTML внутри Markdown не выполняется — react-markdown выводит его текстом,
 * поэтому текст игрока не может вставить на страницу разметку или скрипт.
 */
export function MarkdownText({ markdown }: MarkdownTextProps) {
  return (
    <Box className="sf-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Box>
  );
}
