import { useAppDispatch, useAppSlector } from 'hooks/state';
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { sendReviewAction } from 'store/offers/api-actions';
import { getSendingError, getSendingLoading } from 'store/offers/selectors';
import { raitingRates } from './utils';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

type Props = {
  offerId: number;
}

type FormData = {
  rating: string;
  review: string;
}

export default function ReviewsForm ({offerId}: Props) {
  const isSending = useAppSlector(getSendingLoading);
  const isError = useAppSlector(getSendingError);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    rating: '',
    review: '',
  });

  const {rating, review} = formData;

  const isValidForm = () => {
    const isValidText = review.length > MIN_COMMENT_LENGTH && review.length < MAX_COMMENT_LENGTH;
    const isRated = rating !== '';

    return isValidText && isRated;
  };

  const changeHandler = (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData((prev) => ({...prev, [evt.target.name]: evt.target.value}));
  };

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    const payload = {...formData, offerId};
    dispatch(sendReviewAction(payload));
    if (!isError) {
      setFormData({ rating: '', review: ''});
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {raitingRates.map(({title, value}) =>
          (
            <Fragment key={title}>
              <input className="form__rating-input visually-hidden" onChange={changeHandler} name="rating" value={value} id={`${value}-stars`} checked={formData.rating === value} disabled={isSending} type="radio"/>
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          )
        )}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={changeHandler} value={review} id="review" name="review" minLength={50} disabled={isSending} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValidForm()}>Submit</button>
      </div>
    </form>
  );
}
