import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Rules } from '../pages/Rules';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Rules />
    </AppProviders>
  </StrictMode>,
);
