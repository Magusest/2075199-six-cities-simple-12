import { AppRoute } from 'const';
import { Link, useLocation } from 'react-router-dom';

function Logo(): JSX.Element {
  const { pathname } = useLocation();

  switch(pathname) {
    case (AppRoute.Main):
      return (
        <div className="header__logo-link">
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
        </div>
      );
    default:
      return (
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
        </Link>
      );
  }
}

export default Logo;
