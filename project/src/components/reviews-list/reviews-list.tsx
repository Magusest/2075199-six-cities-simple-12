import { Comment } from 'components';
import { Reviews } from 'types/reviews';

type Props = {
  comments: Reviews;
}

export default function ReviewsList({comments}: Props) {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <li className="reviews__item" key={comment.id}>
          <Comment reviewData={comment}/>
        </li>
      ))}
    </ul>
  );
}
