import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/App';

const container = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Po `npm run build` treść jest już w HTML (scripts/prerender.mjs); w `vite dev` kontener jest pusty.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
