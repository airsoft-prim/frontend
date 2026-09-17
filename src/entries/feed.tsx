import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Feed } from '../pages/Feed';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Feed />
    </AppProviders>
  </StrictMode>,
);
