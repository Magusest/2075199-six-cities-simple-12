import { SyntheticEvent, useState } from 'react';
import { sortingOptions } from 'const';
import { useAppDispatch, useAppSlector } from 'hooks/state';
import { sortOffers } from 'store/actions';
import { SortingOption } from 'types/sorting';

// const {log} = console;

export default function PlaceSorting() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSorting = useAppSlector((state) => state.sorting);
  const dispatch = useAppDispatch();

  const clickTypeHandler = (evt: SyntheticEvent<HTMLElement, MouseEvent>) => {
    const target = evt.target as HTMLElement;
    dispatch(sortOffers({checkedSorting: target.textContent as SortingOption}));
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={() => (setIsOpen(!isOpen))} tabIndex={0}>
        {selectedSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>

        {
          sortingOptions.map((option) => (
            <li
              className={`places__option ${option === selectedSorting ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={option}
              onClick={clickTypeHandler}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>
  );
}
