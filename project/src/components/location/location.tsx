import { useAppDispatch, useAppSlector } from 'hooks/state';
import { Link } from 'react-router-dom';
import { AppRoute } from 'const';
import { changeCity } from 'store/offers/reducer';
import { getCurrentCity } from 'store/offers/selectors';

// const {log} = console;

type Props = {
  location: string;
};


export default function Location ({location}: Props) {

  const currentCity = useAppSlector(getCurrentCity);

  const dispatch = useAppDispatch();

  const changeCityHandler = () => {
    dispatch(changeCity(location));
  };

  switch(location) {
    case (currentCity.name):
      return (
        <Link className="locations__item-link tabs__item tabs__item--active" onClick={ changeCityHandler } to={AppRoute.Main}>
          <span>{location}</span>
        </Link>
      );
    default:
      return (
        <Link className="locations__item-link tabs__item" onClick={ changeCityHandler } to={AppRoute.Main}>
          <span>{location}</span>
        </Link>
      );
  }
}
