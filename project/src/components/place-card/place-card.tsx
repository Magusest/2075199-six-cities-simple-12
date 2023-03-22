import { AppRoute } from 'const';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from 'types/offers';

const {log} = console;

type CardStateType = {
  id: number | null;
}

type Props = {
  offer: Offer;
}

function PlaceCard({offer}: Props): JSX.Element {
  const {previewImage, price, title, type, id} = offer;

  const [cardActive, setCardActive] = useState<CardStateType>({ id: null });

  const mouseHandler = (currentId: number) => {
    setCardActive({ id: currentId });
    log(currentId);
  };

  return (
    <article
      className={
        cardActive.id === id
          ? 'cities__card place-card place-card_active'
          : 'cities__card place-card'
      }
      onMouseEnter={() => mouseHandler(id)}
      // "cities__card place-card"
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}${id}`}>
          <img className="place-card__image" src={`img/${previewImage}`} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style= {{
                width: '80%',
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
