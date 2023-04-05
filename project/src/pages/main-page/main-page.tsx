import { EmptyMain, Header, Main } from 'components';
import { useAppSlector } from 'hooks/state';

// const {log} = console;

function MainPage(): JSX.Element {
  const offers = useAppSlector(({currentRooms}) => currentRooms);

  if (offers.length === 0) {
    return (
      <>
        <Header />
        <EmptyMain />
      </>
    );
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default MainPage;
