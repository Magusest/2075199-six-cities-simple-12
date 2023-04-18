import { AppRoute, AuthorizationStatus } from 'const';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from 'components';
import { useAppDispatch, useAppSlector } from 'hooks/state';
import { getAuthorithationStatus, getCurrentCity } from 'store/selectors';
import { loginAction } from 'store/api-actions';
import { FormEvent } from 'react';

function LoginPage() {
  const currentCity = useAppSlector(getCurrentCity);
  const authtorithationStatus = useAppSlector(getAuthorithationStatus);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(event.target as HTMLFormElement));

    dispatch(loginAction({
      login: email as string,
      password: password as string,
    }));

  };

  if (authtorithationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }


  return (
    <>
      <Helmet>
        <title>Шесть городов. Авторизация.</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{currentCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
