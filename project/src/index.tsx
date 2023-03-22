import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components';
import { offers } from 'mocks/offers';

const currentCity = offers[0].city;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offers = {offers}
      city = {currentCity}
    />
  </React.StrictMode>,
);
