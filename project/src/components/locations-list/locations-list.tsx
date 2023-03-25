import { Location } from 'components';
import { Cities } from 'types/offers';
import { offerLocations } from './const';

const locations: Cities = offerLocations;

export default function LocationList () {
  return (
    <ul className="locations__list tabs__list">
      {locations.map((location) => (
        <li className="locations__item" key={location}>
          <Location location={location}/>
        </li>
      ))}
    </ul>
  );
}
