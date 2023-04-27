import { PlaceCard } from 'components';
import { Offer, Offers } from 'types/offers';

// const {log} = console;
type Props = {
  offers: Offers;
  onHoverCard?: (offer: Offer | null) => void;
}

function OffersList({offers, onHoverCard}: Props) {
  return (
    <>
      {offers.map((offer: Offer) => (<PlaceCard key={offer.id} offer={offer} onHoverCard={onHoverCard} />))}
    </>
  );
}

export default OffersList;
