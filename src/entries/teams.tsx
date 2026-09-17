import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Teams } from '../pages/Teams';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Teams />
    </AppProviders>
  </StrictMode>,
);
