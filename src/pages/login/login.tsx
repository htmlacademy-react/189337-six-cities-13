import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Login(): JSX.Element {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    !isAuth ?
      <div className="page page--gray page--login">
        <Helmet>
          <title>6 cities: authorization</title>
        </Helmet>
        <Header showNav={false} />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <LoginForm />
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
      :
      <Navigate to={AppRoute.Main} />
  );
}
