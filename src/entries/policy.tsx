import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Policy } from '../pages/Policy';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Policy />
    </AppProviders>
  </StrictMode>,
);
