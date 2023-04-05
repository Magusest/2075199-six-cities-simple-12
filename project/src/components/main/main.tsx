import { useAppSlector } from 'hooks/state';
import { plural, offerLocations } from 'const';
import { LocationList, PlaceSorting, OffersList, Map } from 'components';

// const offerLocations: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldolf'];

function getTextByCount(count: number, city: string): string {
  const pluralRules = plural.select(count);
  switch(pluralRules) {
    case 'one':
      return `${count} place to stay in ${city}`;
    default:
      return `${count} places to stay in ${city}`;
  }
}

export default function Main() {
  const countOffers = useAppSlector(({currentRooms}) => currentRooms.length);
  const curCity = useAppSlector(({city}) => city.name);

  const plasesText = getTextByCount(countOffers, curCity);


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">

          <LocationList locations={offerLocations}/>

        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{plasesText}</b>

            <PlaceSorting />

            <div className="cities__places-list places__list tabs__content">

              <OffersList />

            </div>
          </section>
          <div className="cities__right-section">
            <Map />
          </div>
        </div>
      </div>
    </main>

  );
}
