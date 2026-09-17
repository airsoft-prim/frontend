import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mantine/core';

interface MarkdownDocumentProps {
  /** Разметка документа — содержимое файла из `src/content`, прочитанное через `?raw` */
  markdown: string;
}

/**
 * Документ, свёрстанный из Markdown.
 *
 * Текст правил и политики живёт отдельными файлами (`src/content/*.md`), а не
 * в разметке страниц: формулировки правит администрация, и для этого не нужно
 * трогать компоненты и пересобирать логику страницы.
 *
 * Типографика документа — в классе `sf-document` (src/styles/global.css).
 * Markdown отдаёт обычные теги (`h2`, `p`, `ul`, `table`), до которых props
 * Mantine не достают, поэтому длинный текст оформляется стилями, а не
 * компонентами. Ширину колонки задаёт `SiteLayout` (variant="document").
 *
 * HTML внутри Markdown не выполняется — react-markdown выводит его как текст,
 * поэтому файл документа не может вставить на страницу разметку или скрипт.
 */
export function MarkdownDocument({ markdown }: MarkdownDocumentProps) {
  return (
    <Box className="sf-document">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </Box>
  );
}
