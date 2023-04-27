import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { App, HistoryRouter } from 'components';
import { store } from 'store';
import { fetchOffers } from 'store/offers/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import browserHistory from 'browser-history';

store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
