import RatingStars from 'components/rating-stars/rating-stars';
import { Classes } from 'const';
import { Review } from 'types/reviews';

type Props = {
  reviewData: Review;
}

function getDate(dateValue: string): string[] {
  const date = new Date(dateValue);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const dateProperty = [year, month, day].join('-');

  const dateText = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return [dateProperty, dateText];
}

export default function Comment ({reviewData}: Props) {
  const {user, rating, date, comment} = reviewData;
  const [machineDate, humanDate] = getDate(date);
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={rating} className={Classes.Review} />
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={machineDate}>{humanDate}</time>
      </div>
    </>
  );
}
