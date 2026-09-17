import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Games } from '../pages/Games';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Games />
    </AppProviders>
  </StrictMode>,
);
