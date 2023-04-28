import { AppRoute, PrefixCls } from 'const';
import { Link, useLocation } from 'react-router-dom';
import { Offer } from 'types/offers';
import { PremiumMark, RatingStars } from 'components';
import { memo } from 'react';

type Props = {
  offer: Offer;
  onHoverCard?: (offer: Offer | null) => void;

}

function PlaceCard({offer, onHoverCard}: Props): JSX.Element {

  const { pathname } = useLocation();

  const {previewImage, price, title, type, id, isPremium, rating} = offer;

  const handleOfferHover = (value: Offer | null) => {
    if (typeof onHoverCard === 'function') {
      onHoverCard(value);
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => handleOfferHover(offer)}
      onMouseLeave={() => handleOfferHover(null)}
    >

      {isPremium ? <PremiumMark className={'place-card__mark'}/> : null}

      <div className={`${AppRoute.Main === pathname ? 'cities__image-wrapper' : 'near-places__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Room}${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <RatingStars rating={rating} classPrefx={PrefixCls.Main}/>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
