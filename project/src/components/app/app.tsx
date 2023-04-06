import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from 'const';
import { MainPage, LoginPage, OfferPage, NotFoundPage } from 'pages';
import { LoadingScreen } from 'components';
import { useAppSlector } from 'hooks/state';

function App(): JSX.Element {
  const isOffersLoading = useAppSlector(({isRoomsLoading}) => isRoomsLoading);

  if (isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
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
  );
}

export default App;
