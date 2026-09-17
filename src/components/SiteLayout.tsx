import type { ReactNode } from 'react';
import { Box, Card } from '@mantine/core';

import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface SiteLayoutProps {
  children?: ReactNode;
  /**
   * Левая колонка раздела — общий блок пользователя (`SiteAside`).
   * Без него страница остаётся одноколоночной.
   */
  aside?: ReactNode;
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
 * Раздел собирается из двух колонок: слева общий блок пользователя (`aside`),
 * справа контент страницы. Контент сам решает, делится ли он надвое: на
 * «Играх» это список игр и статистика (класс `.sf-split`), в остальных
 * разделах — один блок. Без `aside` страница остаётся одноколоночной: так
 * живут документы («Правила», «Политика»).
 *
 * Поля задаёт единый токен `--sf-gutter`, а не max-width. Поэтому шапка,
 * контент и футер выровнены по одним краям, а контент занимает всё полезное
 * пространство окна.
 *
 * Шапка и футер остаются во всю ширину в любом варианте: подложку получает
 * только область контента, поэтому «документ» не выглядит отдельным окном.
 */
export function SiteLayout({
  children,
  aside,
  variant = 'wide',
}: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      <Box
        component="main"
        style={{
          flex: 1,
          paddingInline: 'var(--sf-gutter)',
          paddingBlock: 'var(--mantine-spacing-md)',
          /* Область контента — одна строка на всю высоту: колонки раздела
           * дотягиваются до футера, а не обрываются на своём содержимом.
           * Минимум строки — её содержимое, поэтому страница не обрезается,
           * а растёт, если места не хватило */
          ...(variant === 'document'
            ? {}
            : { display: 'grid', gridTemplateRows: '1fr' }),
        }}
      >
        {variant === 'document' ? (
          <Card
            padding="xl"
            style={{ maxWidth: DOCUMENT_WIDTH, marginInline: 'auto' }}
          >
            {children}
          </Card>
        ) : aside ? (
          /* Контент идёт первым: на узком экране он оказывается сверху,
             а блок пользователя — под ним */
          <Box className="sf-page-layout">
            <Box className="sf-page-layout__content">{children}</Box>
            <Box className="sf-page-layout__aside">{aside}</Box>
          </Box>
        ) : (
          children
        )}
      </Box>
      <SiteFooter />
    </>
  );
}
