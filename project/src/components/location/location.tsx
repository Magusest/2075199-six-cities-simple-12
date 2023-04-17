import { useAppDispatch, useAppSlector } from 'hooks/state';
import { Link } from 'react-router-dom';
import { AppRoute } from 'const';
import { changeCity } from 'store/actions';
import { getCurrentCity } from 'store/selectors';

// const {log} = console;

type Props = {
  location: string;
};


export default function Location ({location}: Props) {

  const currentCity = useAppSlector(getCurrentCity);

  const dispatch = useAppDispatch();


  switch(location) {
    case (currentCity.name):
      return (
        <Link className="locations__item-link tabs__item tabs__item--active" onClick={() => dispatch(changeCity(location))} to={AppRoute.Main}>
          <span>{location}</span>
        </Link>
      );
    default:
      return (
        <Link className="locations__item-link tabs__item" onClick={() => dispatch(changeCity(location))} to={AppRoute.Main}>
          <span>{location}</span>
        </Link>
      );
  }
}
