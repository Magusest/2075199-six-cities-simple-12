const AppRoute = {
  Main: '/',
  Login: '/login',
  Room: '/offer/',
} as const;

const raitingRates = [
  {
    title: 'terribly',
    value: '1'
  },
  {
    title: 'badly',
    value: '2'
  },
  {
    title: 'not bad',
    value: '3'
  },
  {
    title: 'good',
    value: '4'
  },
  {
    title: 'perfect',
    value: '5'
  }
];

export {
  AppRoute,
  raitingRates,
};
