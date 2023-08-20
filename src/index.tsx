import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOffers } from './store/api-action';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-route/history-route';
import Loader from './components/loader/loader';

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <App />
          <Loader />
        </HistoryRouter>
      </HelmetProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
