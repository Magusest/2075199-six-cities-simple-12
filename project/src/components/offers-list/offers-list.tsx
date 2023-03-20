import { PlaceCard } from 'components';
import { Offers, Offer } from 'types/offers';

type Props = {
  offers: Offers;
  onCardHover: (cardItem: string) => void;
}

function OffersList({offers, onCardHover}: Props) {
  return (
    <>
      {offers.map((offer: Offer) => (<PlaceCard key={offer.id} offer={offer} />))}
    </>
  );
}

export default OffersList;
