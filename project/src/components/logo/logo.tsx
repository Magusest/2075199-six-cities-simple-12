import { AppRoute } from 'const';
import { Link, useLocation } from 'react-router-dom';

const LogoImage = () => <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />;

function Logo(): JSX.Element {
  const { pathname } = useLocation();

  switch(pathname) {
    case (AppRoute.Main):
      return (
        <div className="header__logo-link">
          <LogoImage />
        </div>
      );
    default:
      return (
        <Link className="header__logo-link" to="/">
          <LogoImage />
        </Link>
      );
  }
}

export default Logo;
