import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Committees } from '../pages/Committees';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Committees />
    </AppProviders>
  </StrictMode>,
);
