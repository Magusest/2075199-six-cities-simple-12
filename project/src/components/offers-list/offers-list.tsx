import { PlaceCard } from 'components';
import { useAppSlector } from 'hooks/state';
import { useParams } from 'react-router-dom';
import { Offer } from 'types/offers';

// const {log} = console;

function OffersList() {

  const { id } = useParams();

  const currentOffers = useAppSlector(({currentRooms}) => currentRooms);
  const currentCity = useAppSlector(({city}) => city.name);


  const renderOffers = currentOffers.filter((currentRooms) => currentRooms.city.name === currentCity).filter((offer) => offer.id !== Number(id));


  return (
    <>
      {renderOffers.map((offer: Offer) => (<PlaceCard key={offer.id} offer={offer} />))}
    </>
  );
}

export default OffersList;
