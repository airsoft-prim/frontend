import { Text, Title } from '@mantine/core';

import { MarkdownDocument } from '../components/MarkdownDocument';
import { SiteLayout } from '../components/SiteLayout';
import documentText from '../content/rules.md?raw';

/**
 * Правила страйкбола: как ведут себя на полигоне.
 *
 * Текст документа — `src/content/rules.md`: это обычный Markdown, который
 * правится отдельно от кода. Подпись и заголовок остаются в разметке, чтобы
 * страница совпадала с остальными документами портала («Правила
 * использования», «Политика конфиденциальности»).
 *
 * От «Правил использования» страница отличается не устройством, а темой:
 * там — правила портала, здесь — правила игры.
 */
export function Rules() {
  return (
    <SiteLayout variant="document">
      <Title order={1} size="h3" mb={4}>
        Правила страйкбола
      </Title>
      <Text className="sf-meta" mb="lg">
        Как играют на полигоне: безопасность, снаряжение, поражение
      </Text>

      <MarkdownDocument markdown={documentText} />
    </SiteLayout>
  );
}
