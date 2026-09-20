import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '../AppProviders';
import { Me } from '../pages/Me';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Me />
    </AppProviders>
  </StrictMode>,
);
