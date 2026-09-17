import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

/**
 * Общая обвязка всех страниц: тема, резолвер переменных и глобальные стили.
 * Глобальные стили импортируются здесь, потому что это единственная точка,
 * которую делят все HTML-входы, — порядок слоёв (Mantine → токены → проект)
 * задан ровно один раз.
 */
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './styles/tokens.css';
import './styles/global.css';

import { colorSchemeManager } from './theme/color-scheme-manager';
import { cssVariablesResolver } from './theme/css-variables-resolver';
import { theme } from './theme/theme';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme="dark"
    >
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
}
