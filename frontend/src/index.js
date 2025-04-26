import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppRouter />);