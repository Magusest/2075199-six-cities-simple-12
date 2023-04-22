import { Helmet } from 'react-helmet-async';
import { NotFoundPage } from 'pages';
import { Header, PremiumMark, Map, OffersList, RatingStars, LoadingScreen, ReviewsSection } from 'components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSlector } from 'hooks/state';
import { getChosenOffer, getLoadingStatus, getNearbyOffers } from 'store/offers/selectors';
import { fetchChosenOffer } from 'store/offers/api-actions';
import { Classes } from 'const';


// const {log} = console;

// Сделать лоудер при подгрузке данных с сервера!!!

const ProTag = () =>
  (
    <span className="property__user-status">
      Pro
    </span>
  );

function OfferPage(): JSX.Element {

  const { id } = useParams();
  const nearbyOffers = useAppSlector(getNearbyOffers);
  const chosenOffer = useAppSlector(getChosenOffer);
  const isLoading = useAppSlector(getLoadingStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchChosenOffer(Number(id)));
    }
  }, [dispatch ,id]);

  if (!chosenOffer || isLoading) {
    return <NotFoundPage />;
  }

  const {images, title, rating, type, bedrooms, maxAdults, goods, price, isPremium, host, description } = chosenOffer;
  const {name, avatarUrl, isPro} = host;

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
              <RatingStars rating={rating} className={Classes.Property}/>
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
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro' : ''}`}>
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {isPro ? <ProTag /> : null}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewsSection offerId={chosenOffer.id}/>
            </div>
          </div>

          <Map offers={nearbyOffers}/>

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <OffersList offers={nearbyOffers} />

            </div>
          </section>
        </div>
      </main>

    </>
  );
}


export default OfferPage;
