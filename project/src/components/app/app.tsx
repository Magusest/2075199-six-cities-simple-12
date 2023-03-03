// import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';

type AppScreenProps = {
  placesToStay: number;
}

function App({placesToStay}: AppScreenProps): JSX.Element {
  return (
    // <MainPage placesToStay={placesToStay} />
    <OfferPage />
  );
}

export default App;
