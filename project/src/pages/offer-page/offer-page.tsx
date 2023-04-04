import { Helmet } from 'react-helmet-async';
import { Header, PremiumMark, ReviewsForm, ReviewsList, Map, OffersList, RatingStars } from 'components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSlector } from 'hooks/state';
import { Offer } from 'types/offers';

// const {log} = console;

function OfferPage(): JSX.Element {

  const { id } = useParams();

  const [offer, setOffer] = useState<Offer>();

  const currentOffers = useAppSlector(({currentRooms}) => currentRooms);

  useEffect(() => {
    setOffer(currentOffers.find((currentOffer) => currentOffer.id === Number(id)));
  }, [id]);

  if (!offer) {
    return <>Loading...</>;
  }

  const {images, title, rating, type, bedrooms, maxAdults, goods, price, isPremium} = offer;

  return (
    <>
      <Helmet>
        <title>Шесть городов. Карточка отеля.</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, index) =>
                (
                  <div className="property__image-wrapper" key={`${index + 1}${image}`}>
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <PremiumMark className={'property__mark'}/> : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  < RatingStars rating={rating} />
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good)=>
                    (
                      <li className="property__inside-item" key={good}>
                        {good}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>

                <ReviewsList />

                <ReviewsForm />

              </section>
            </div>
          </div>

          <Map />

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <OffersList />

            </div>
          </section>
        </div>
      </main>

    </>
  );
}


export default OfferPage;
