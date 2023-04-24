import { PlaceCard } from 'components';
import { Offer, Offers } from 'types/offers';

// const {log} = console;
type Props = {
  offers: Offers;
}

function OffersList({offers}: Props) {
  return (
    <>
      {offers.map((offer: Offer) => (<PlaceCard key={offer.id} offer={offer} />))}
    </>
  );
}

export default OffersList;
