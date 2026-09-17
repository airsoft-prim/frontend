import { Text, Title } from '@mantine/core';

import { MarkdownDocument } from '../components/MarkdownDocument';
import { SiteLayout } from '../components/SiteLayout';
import documentText from '../content/agreement.md?raw';

/**
 * Правила использования портала.
 *
 * Текст документа — `src/content/agreement.md`: это обычный Markdown, который
 * правится отдельно от кода. Подпись и заголовок остаются в разметке, чтобы
 * страница совпадала с остальными разделами портала.
 */
export function Agreement() {
  return (
    <SiteLayout variant="document">
      <Title order={1} size="h3" mb={4}>
        Правила использования
      </Title>
      <Text className="sf-meta" mb="lg">
        Соглашение об использовании портала
      </Text>

      <MarkdownDocument markdown={documentText} />
    </SiteLayout>
  );
}
