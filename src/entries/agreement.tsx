import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Agreement } from '../pages/Agreement';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Agreement />
    </AppProviders>
  </StrictMode>,
);
