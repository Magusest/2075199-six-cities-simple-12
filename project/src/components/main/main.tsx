import { useAppSlector } from 'hooks/state';
import { plural, offerLocations } from 'const';
import { LocationList, PlaceSorting, OffersList, Map } from 'components';
import { getCurrentCity, getCurrentOffer } from 'store/selectors';

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
  const countOffers = useAppSlector(getCurrentOffer).length;
  const currentCity = useAppSlector(getCurrentCity);

  const plasesText = getTextByCount(countOffers, currentCity.name);


  return (
    <main className="page__main page__main--index">
      <LocationList locations={offerLocations}/>
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
