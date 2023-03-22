import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from 'const';
import { Offers, Offer } from 'types/offers';

import { MainPage, LoginPage, OfferPage, NotFoundPage } from 'pages';

type Props = {
  offers: Offers;
  city: Offer['city'];
}

function App({offers, city}: Props): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage offers={offers} city={city} />}/>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path ={AppRoute.Room}>
            <Route path=':id' element={<OfferPage offers={offers} />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
