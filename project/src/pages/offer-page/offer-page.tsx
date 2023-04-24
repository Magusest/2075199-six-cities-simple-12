import { LoadingScreen, OfferScreen } from 'components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSlector } from 'hooks/state';
import { getChosenOffer, getLoadingOfferStatus } from 'store/offers/selectors';
import { fetchChosenOffer } from 'store/offers/api-actions';
import { Offer } from 'types/offers';

// const {log} = console;

export default function OfferPage(): JSX.Element {

  const { id } = useParams();
  const chosenOffer = useAppSlector(getChosenOffer);
  const isLoading = useAppSlector(getLoadingOfferStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchChosenOffer(Number(id)));
    }
  }, [dispatch ,id]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <OfferScreen offer={chosenOffer as Offer}/>
  );
}
