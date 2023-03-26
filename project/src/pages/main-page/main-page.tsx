import { Header, LocationList, PlaceSorting, OffersList, Map } from 'components';
import { Offers, City } from 'types/offers';

// const {log} = console;

type Props = {
  offers: Offers;
  city: City;
}

function MainPage({offers, city}: Props): JSX.Element {

  return (
    <>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <LocationList />

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>

              < PlaceSorting />

              <div className="cities__places-list places__list tabs__content">

                <OffersList offers={offers} />

              </div>
            </section>
            <div className="cities__right-section">
              <Map offers={offers} city={city} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
