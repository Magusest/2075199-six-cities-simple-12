import { Review } from 'components';

export default function ReviewsList() {
  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <Review />
      </li>
    </ul>
  );
}
