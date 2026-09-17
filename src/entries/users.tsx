import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Users } from '../pages/Users';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Users />
    </AppProviders>
  </StrictMode>,
);
