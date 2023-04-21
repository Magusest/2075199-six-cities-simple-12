import { ReviewsForm, ReviewsList } from 'components';
import { AuthorizationStatus } from 'const';
import { useAppSlector } from 'hooks/state';
import { getOfferComments } from 'store/offers/selectors';
import { getAuthorithationStatus } from 'store/user/selectors';


export default function ReviewsSection() {
  const comments = useAppSlector(getOfferComments);
  const authorizationStatus = useAppSlector(getAuthorithationStatus);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewsList comments={comments}/>
      {authorizationStatus === AuthorizationStatus.Auth
        ? < ReviewsForm />
        : null}
    </section>

  );
}
