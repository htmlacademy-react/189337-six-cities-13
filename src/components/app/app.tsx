import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import NotFoundPage from '../../pages/not-found/not-found';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { ToastContainer } from 'react-toastify';


export default function App(): JSX.Element {
  return (
    <>
      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
            />
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Loader />
        </HistoryRouter>
      </HelmetProvider>
      <ToastContainer />
    </>
  );
}
