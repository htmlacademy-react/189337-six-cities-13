import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, Settings } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Main cardsCount={Settings.cardsCount} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute isAuth={Settings.isAuth}>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>

  );
}
