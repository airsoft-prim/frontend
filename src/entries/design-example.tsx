import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { DesignExample } from '../pages/DesignExample';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <DesignExample />
    </AppProviders>
  </StrictMode>,
);
