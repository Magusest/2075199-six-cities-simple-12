import { AppRoute, AuthorizationStatus } from 'const';
import { useAppSlector, useAppDispatch } from 'hooks/state';
import { store } from 'store';
import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkAuthStatus, logoutAction } from 'store/user/api-actions';
import { getAuthorithationStatus, getUserData } from 'store/user/selectors';

function Authrizarion() {

  const userData = useAppSlector(getUserData);
  const authorizationStatus = useAppSlector(getAuthorithationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      store.dispatch(checkAuthStatus());
    }
  }, [authorizationStatus]);

  switch (authorizationStatus) {
    case (AuthorizationStatus.Auth):
      return (
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <div className="header__nav-profile">
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${ userData.avatarUrl })`}}></div>
                <span className="header__user-name user__name">{ userData.email }</span>
              </div>
            </li>
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                to={AppRoute.Main}
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(logoutAction());
                }}
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      );
    default:
      return (
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          </ul>
        </nav>
      );
  }
}

export default memo(Authrizarion);
