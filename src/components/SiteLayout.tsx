import type { ReactNode } from 'react';
import { Box, Card } from '@mantine/core';

import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface SiteLayoutProps {
  children?: ReactNode;
  /**
   * `document` — страница-документ: контент ложится на подложку и собирается
   * в колонку по центру. Без этого длинный текст растягивается на всю ширину
   * окна и теряет читаемость, а без подложки висит в воздухе, не отделяясь
   * от фона приложения.
   * По умолчанию `wide`: раскладка во всю ширину с полями `--sf-gutter`.
   */
  variant?: 'wide' | 'document';
}

/**
 * Ширина страницы-документа. Лист, а не полоса во всю ширину окна: длину
 * строки дальше задают внутренние отступы подложки, а не её максимум.
 */
const DOCUMENT_WIDTH = '55rem';

/**
 * Общий каркас страницы: шапка, область контента и футер.
 *
 * Раскладка во всю ширину — поля задаёт единый токен `--sf-gutter`, а не
 * max-width. Поэтому шапка, контент и футер выровнены по одним краям,
 * а контент занимает всё полезное пространство окна.
 *
 * Шапка и футер остаются во всю ширину в любом варианте: подложку получает
 * только область контента, поэтому «документ» не выглядит отдельным окном.
 */
export function SiteLayout({ children, variant = 'wide' }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      <Box
        component="main"
        style={{
          flex: 1,
          paddingInline: 'var(--sf-gutter)',
          paddingBlock: 'var(--mantine-spacing-xl)',
        }}
      >
        {variant === 'document' ? (
          <Card
            padding="xl"
            style={{ maxWidth: DOCUMENT_WIDTH, marginInline: 'auto' }}
          >
            {children}
          </Card>
        ) : (
          children
        )}
      </Box>
      <SiteFooter />
    </>
  );
}
