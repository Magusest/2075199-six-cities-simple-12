import { useAppDispatch, useAppSlector } from 'hooks/state';
import { changeCity } from 'store/actions';

// const {log} = console;

type Props = {
  location: string;
};


export default function Location ({location}: Props) {

  const currentCity = useAppSlector(({city}) => city.name);

  const dispatch = useAppDispatch();


  switch(location) {
    case (currentCity):
      return (
        // Спросить как лучше всего избавитьс от ссылок
        <a className="locations__item-link tabs__item tabs__item--active" onClick={() => dispatch(changeCity(location))} href="#">
          <span>{location}</span>
        </a>
      );
    default:
      return (
        <a className="locations__item-link tabs__item" onClick={() => dispatch(changeCity(location))} href="#">
          <span>{location}</span>
        </a>
      );
  }
}
