import { defaultCity } from 'const';

type Props = {
  location: string;
};

export default function Location ({location}: Props) {
  switch(location) {
    case (defaultCity.name):
      return (
        <a className="locations__item-link tabs__item tabs__item--active" href="#">
          <span>{location}</span>
        </a>
      );
    default:
      return (
        <a className="locations__item-link tabs__item" href="#">
          <span>{location}</span>
        </a>
      );
  }
}
