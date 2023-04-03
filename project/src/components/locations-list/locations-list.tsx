import { Location } from 'components';

type Props = {
  locations: string[];
}

export default function LocationList ({locations}: Props) {
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
