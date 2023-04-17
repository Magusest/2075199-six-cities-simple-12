import { EmptyMain, Header, Main } from 'components';
import { useAppSlector } from 'hooks/state';
import { getCurrentOffer } from 'store/selectors';

// const {log} = console;

function MainPage(): JSX.Element {
  const offers = useAppSlector(getCurrentOffer);

  return (
    <>
      <Header />
      {
        offers.length === 0
          ? <EmptyMain />
          : <Main />
      }
    </>
  );
}

export default MainPage;
