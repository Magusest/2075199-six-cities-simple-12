import { useState } from 'react';
import { defaultCity } from 'const';

const {log} = console;

type Props = {
  location: string;
};

type LocationStateType = string | null;

export default function Location ({location}: Props) {
  const [, setLocationActive] = useState<LocationStateType>(null);

  const mouseHandler = (locationActive: string) => {
    setLocationActive(locationActive);
    log(locationActive);
  };

  switch(location) {
    case (defaultCity.name):
      return (
        <a className="locations__item-link tabs__item tabs__item--active" onMouseEnter={() => mouseHandler(location)} href="#">
          <span>{location}</span>
        </a>
      );
    default:
      return (
        <a className="locations__item-link tabs__item" onMouseEnter={() => mouseHandler(location)} href="#">
          <span>{location}</span>
        </a>
      );
  }
}
