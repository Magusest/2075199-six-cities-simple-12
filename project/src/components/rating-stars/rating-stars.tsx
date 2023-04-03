type Props = {
  rating: number;
}

// Функция переводит цифру рейтинга в проценты от которых будет зависить ширина закрашивания звезд рейтинга
function ratingCounter(rate: number) {
  const width = (100 / 5) * Math.round(rate);
  return `${width}%`;
}

export default function RatingStars({rating}: Props) {
  return (
    <>
      <span
        style= {{
          width: ratingCounter(rating),
        }}
      />
      <span className="visually-hidden">Rating</span>
    </>
  );
}
