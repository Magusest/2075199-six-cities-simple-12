import { ChangeEvent, useState } from 'react';
import { raitingRates } from './utils';

// const {log} = console;

export default function ReviewsForm () {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const {rating, review} = formData;

  const isValidForm = () => {
    if (rating !== '') {
      if (review === '') {
        return false;
      } if (review.length > 0 && review.length < 50) {
        return true;
      } if (review.length > 50) {
        return false;
      }
    }

    return true;
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
            <>
              <input className="form__rating-input visually-hidden" onChange={changeHandler} name="rating" value={value} id={`${value}-stars`} type="radio" key={title} />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </>
          )
        )}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={changeHandler} value={review} id="review" name="review" minLength={50} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isValidForm()}>Submit</button>
      </div>
    </form>
  );
}
