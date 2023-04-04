import { City } from 'types/offers';

const AppRoute = {
  Main: '/',
  Login: '/login',
  Room: '/offer/',
} as const;

const APIRoute = {
  Offers: '/hotels',
  Login: '/login',
  Logout: '/logout',
} as const;

const defaultCity: City = {
  'location': {
    'latitude': 48.864716,
    'longitude': 2.3488,
    'zoom': 10
  },
  'name': 'Paris'
};

const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

const DEFAULT_SORTING = 'Popular';

const plural = new Intl.PluralRules('eu-US');

const DEFAULT_SELECTED_CARD = -1;

export {
  AppRoute,
  defaultCity,
  sortingOptions,
  DEFAULT_SORTING,
  plural,
  DEFAULT_SELECTED_CARD,
  APIRoute,
};
