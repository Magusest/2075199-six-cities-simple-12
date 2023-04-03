import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from 'const';
import { MainPage, LoginPage, OfferPage, NotFoundPage } from 'pages';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />}/>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path ={AppRoute.Room}>
            <Route path=':id' element={<OfferPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
