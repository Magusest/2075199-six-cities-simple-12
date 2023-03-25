const AppRoute = {
  Main: '/',
  Login: '/login',
  Room: '/offer/',
} as const;

const offerCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldolf'];

const defaultCity = 'Amsterdam';

export {
  AppRoute,
  offerCities,
  defaultCity,
};
