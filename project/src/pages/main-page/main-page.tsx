import { EmptyMain, Header, Main } from 'components';
import { useAppSlector } from 'hooks/state';
import { getCurrentOffer } from 'store/offers/selectors';

function MainPage(): JSX.Element {
  const offers = useAppSlector(getCurrentOffer);

  return (
    <div className="page page--gray page--main">
      <Header />
      {
        offers.length === 0
          ? <EmptyMain />
          : <Main />
      }
    </div>
  );
}

export default MainPage;
