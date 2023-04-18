import { AppRoute, AuthorizationStatus } from 'const';
import { useAppSlector, useAppDispatch } from 'hooks/state';
import { store } from 'store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkAuthStatus, logoutAction } from 'store/api-actions';
import { getAuthorithationStatus, getUserData } from 'store/selectors';

export default function Authrizarion() {

  const { email, avatarUrl} = useAppSlector(getUserData);
  const authorizationStatus = useAppSlector(getAuthorithationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      store.dispatch(checkAuthStatus());
    }
  }, [authorizationStatus]);

  return (

    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.NoAuth
        ?
        (
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          </ul>
        )
        :
        (
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <div className="header__nav-profile">
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${avatarUrl})`}}></div>
                <span className="header__user-name user__name">{email}</span>
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
        )}
    </nav>
  );
}
