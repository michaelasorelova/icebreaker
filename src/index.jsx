import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import './global.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { FavoriteQuestions } from './pages/FavoriteQuestions';
import { DeletedQuestions } from './pages/DeletedQuestions';
import { QuestionCards } from './pages/QuestionCards';
import { SpinBottleGame } from './pages/SpinBottleGame';
import { Error } from "./pages/Error";
import { Contact } from "./pages/Contact";

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
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
      { index: true, element: <Home /> },
      { path: 'question-cards/:category', element: <QuestionCards /> },
      { path: 'spin-bottle-game', element: <SpinBottleGame /> },
      { path: 'favorite-questions', element: <FavoriteQuestions /> },
      { path: 'deleted-questions', element: <DeletedQuestions /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Error /> },
    ],
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);