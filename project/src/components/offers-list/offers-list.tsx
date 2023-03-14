import { PlaceCard } from 'components';
import { Offers } from 'types/offers';

type Props = {
  offers: Offers;
}

function OffersList({offers}: Props) {
  return (
    <>
      {offers.map((offer) => (<PlaceCard key={offer.id} offer={offer} />))}
    </>
  );
}

export default OffersList;
