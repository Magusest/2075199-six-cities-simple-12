import { PlaceCard } from 'components';
import { useAppSlector } from 'hooks/state';
import { useParams } from 'react-router-dom';
import { Offer } from 'types/offers';

// const {log} = console;

function OffersList() {

  const { id } = useParams();

  const currentOffers = useAppSlector(({rooms}) => rooms);
  const currentCity = useAppSlector(({city}) => city.name);


  const renderOffers = currentOffers.filter((room) => room.city.name === currentCity).filter((offer) => offer.id !== Number(id));


  return (
    <>
      {renderOffers.map((offer: Offer) => (<PlaceCard key={offer.id} offer={offer} />))}
    </>
  );
}

export default OffersList;
