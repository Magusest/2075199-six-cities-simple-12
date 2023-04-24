type Props = {
  rating: number;
  classPrefx: string;
}

// Функция переводит цифру рейтинга в проценты от которых будет зависить ширина закрашивания звезд рейтинга
function ratingCounter(rate: number) {
  const width = (100 / 5) * Math.round(rate);
  return `${width}%`;
}

export default function RatingStars({rating, classPrefx}: Props) {

  return (
    <div className={`${classPrefx}__rating rating`}>
      <div className={`${classPrefx}__stars rating__stars`}>
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
