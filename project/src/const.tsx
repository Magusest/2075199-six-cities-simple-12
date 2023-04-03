import { City } from 'types/offers';

const AppRoute = {
  Main: '/',
  Login: '/login',
  Room: '/offer/',
} as const;

const defaultCity: City = {
  'location': {
    'latitude': 52.370216,
    'longitude': 4.895168,
    'zoom': 10
  },
  'name': 'Amsterdam'
};

const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

const DEFAULT_SORTING = 'Popular';

export {
  AppRoute,
  defaultCity,
  sortingOptions,
  DEFAULT_SORTING,
};
