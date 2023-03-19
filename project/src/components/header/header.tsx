import { AppRoute } from 'const';
import { Logo, Authtorization } from 'components';
import { useLocation } from 'react-router-dom';

function Header(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {AppRoute.Login === pathname ? null : <Authtorization />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
