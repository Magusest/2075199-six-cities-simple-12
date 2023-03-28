import { PlaceCard } from 'components';
import { useAppSlector } from 'hooks/state';
import { Offer } from 'types/offers';

// const {log} = console;

function OffersList() {

  const currentOffers = useAppSlector(({rooms}) => rooms);
  const currentCity = useAppSlector(({city}) => city.name);

  const renderOffers = currentOffers.filter((room) => room.city.name === currentCity);

  return (
    <>
      {renderOffers.map((offer: Offer) => (<PlaceCard key={offer.id} offer={offer} />))}
    </>
  );
}

export default OffersList;
