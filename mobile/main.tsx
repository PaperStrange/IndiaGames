import React from 'react';
import { createRoot } from 'react-dom/client';
import NotebookApp from '../app/notebook-app';
import '../app/globals.css';
const apiBase = (import.meta as ImportMeta & {
    env: Record<string, string>;
}).env.VITE_API_URL || '';
createRoot(document.getElementById('root')!).render(<React.StrictMode><NotebookApp apiBase={apiBase}/></React.StrictMode>);
