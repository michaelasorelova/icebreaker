import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import { App } from './components/App';
import './global.css';

createRoot(
  document.querySelector('#app'),
).render(<App />);
