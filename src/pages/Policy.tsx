import { Text, Title } from '@mantine/core';

import { MarkdownDocument } from '../components/MarkdownDocument';
import { SiteLayout } from '../components/SiteLayout';
import documentText from '../content/documents/policy.md?raw';

/**
 * Политика конфиденциальности.
 *
 * Текст документа — `src/content/documents/policy.md`: это обычный Markdown, который
 * правится отдельно от кода. Подпись и заголовок остаются в разметке, чтобы
 * страница совпадала с остальными разделами портала.
 */
export function Policy() {
  return (
    <SiteLayout variant="document">
      <Title order={1} size="h3" mb={4}>
        Политика конфиденциальности
      </Title>
      <Text className="sf-meta" mb="lg">
        Какие данные собирает портал и как они используются
      </Text>

      <MarkdownDocument markdown={documentText} />
    </SiteLayout>
  );
}
