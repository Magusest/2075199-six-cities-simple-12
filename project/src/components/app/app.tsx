import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from 'const';
import { Offers } from 'types/offers';

import { MainPage, LoginPage, OfferPage, NotFoundPage } from 'pages';

type Props = {
  offers: Offers;
}

function App({offers}: Props): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage offers={offers} />}/>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path ={AppRoute.Room} element={<OfferPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
