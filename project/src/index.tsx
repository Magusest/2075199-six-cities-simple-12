import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';


const placesToStayCount = 123;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      placesToStay = {placesToStayCount}
    />
  </React.StrictMode>,
);
