import { EmptyMain, Header, Main } from 'components';
import { useAppSlector } from 'hooks/state';

// const {log} = console;

function MainPage(): JSX.Element {
  const offers = useAppSlector(({currentRooms}) => currentRooms);

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
