import { Classes } from 'const';

type Props = {
  rating: number;
  className: string;
}

// Функция переводит цифру рейтинга в проценты от которых будет зависить ширина закрашивания звезд рейтинга
function ratingCounter(rate: number) {
  const width = (100 / 5) * Math.round(rate);
  return `${width}%`;
}

export default function RatingStars({rating, className}: Props) {
  switch (className) {
    case Classes.Review:
      return (
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: ratingCounter(rating),
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
      );
    case Classes.Property:
      return (
        <div className="property__rating rating">
          <div className="property__stars rating__stars">
            <span
              style={{
                width: ratingCounter(rating),
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="property__rating-value rating__value">{rating}</span>
        </div>

      );
    default:
      return (
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: ratingCounter(rating),
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
      );

  }

}
