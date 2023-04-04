import { ChangeEvent, Fragment, useState } from 'react';
import { raitingRates } from './utils';

// const {log} = console;

export default function ReviewsForm () {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const {rating, review} = formData;

  //  Оценка валидности формы.
  //  Форму можно отправить если:
  //  1) Пользователь поставил оценку и оставил полке отзыва пустым.
  //  2) Еслт пользователь оставил оценку и написал отзыв не менее 50 знаков и не более 300.

  const isValidForm = () => {
    if (rating !== '') {
      if (review === '') {
        return true;
      } if (review.length > 0 && review.length <= 50) {
        return false;
      } if (review.length < 300) {
        return true;
      }
    }

    return false;
  };

  const changeHandler = (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {raitingRates.map(({title, value}) =>
          (
            <Fragment key={title}>
              <input className="form__rating-input visually-hidden" onChange={changeHandler} name="rating" value={value} id={`${value}-stars`} type="radio"/>
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          )
        )}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={changeHandler} value={review} id="review" name="review" minLength={50} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValidForm()}>Submit</button>
      </div>
    </form>
  );
}
