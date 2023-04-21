import { Comment } from 'components';
import { useAppSlector } from 'hooks/state';
import { getOfferComments } from 'store/offers/selectors';

export default function ReviewsList() {
  const comments = useAppSlector(getOfferComments);

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <li className="reviews__item" key={comment.id}>
          <Comment comment={comment}/>
        </li>
      ))}
    </ul>
  );
}
