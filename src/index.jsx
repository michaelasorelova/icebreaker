import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import './global.css';

import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { About } from './pages/About';
import { Favorites } from './pages/Favorites';
import { QuestionPage } from './pages/QuestionPage';
import { SpinBottle } from './pages/SpinBottle';
import { ErrorPage } from "./pages/ErrorPage";
import { Contact } from "./pages/Contact";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'questions', element: <QuestionPage /> },
      { path: 'spin', element: <SpinBottle /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);