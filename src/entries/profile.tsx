import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Profile } from '../pages/Profile';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Profile />
    </AppProviders>
  </StrictMode>,
);
