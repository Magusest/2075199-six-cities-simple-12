import MainPage from '../../pages/main-page/main-page';


type AppScreenProps = {
  placesToStay: number;
}

function App({placesToStay}: AppScreenProps): JSX.Element {
  return (
    <MainPage placesToStay={placesToStay} />
  );
}

export default App;
