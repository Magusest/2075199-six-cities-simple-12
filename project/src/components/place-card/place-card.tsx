import { useAppDispatch } from 'hooks/state';
import { AppRoute } from 'const';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Offer } from 'types/offers';
import { PremiumMark } from 'components';
import { hovereCard } from 'store/actions';

// const {log} = console;

type CardStateType = {
  id: number | null;
}

type Props = {
  offer: Offer;
}

function PlaceCard({offer}: Props): JSX.Element {

  const { pathname } = useLocation();
  // const hoveredCard = useAppSlector((hoveredCard) => hoveredCard);

  const dispatch = useAppDispatch();


  const {previewImage, price, title, type, id, isPremium} = offer;

  const [cardActive, setCardActive] = useState<CardStateType>({ id: null });

  const mouseHandler = (currentId: number) => {
    setCardActive({ id: currentId });
    dispatch(hovereCard(currentId));
  };

  return (
    <article
      className={
        cardActive.id === id
          ? `${AppRoute.Main === pathname ? 'cities__card' : 'near-places__card'} place-card place-card_active`
          : `${AppRoute.Main === pathname ? 'cities__card' : 'near-places__card'} place-card`
      }
      onMouseEnter={() => mouseHandler(id)}
      onMouseLeave={() => dispatch(hovereCard(0))}
    >

      {isPremium ? <PremiumMark className={'place-card__mark'}/> : null}

      <div className={`${AppRoute.Main === pathname ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}>
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
