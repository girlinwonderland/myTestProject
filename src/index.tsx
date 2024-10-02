import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('app');

if (!container) {
  throw new Error('контейнер не найден');
}

const rootElement = createRoot(container);

rootElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
