import { MouseEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { getRandomElement } from '../../cities';
import { Cities } from '../../types/city';
import { getIsAuth } from '../../store/user-process/selectors';
import { changeActiveCity } from '../../store/cities-process/cities-process';

function Login(): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const randomCity = getRandomElement<Cities>(CITIES);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateToRandomCity = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(changeActiveCity(randomCity));
    navigate(AppRoute.Main);
  };

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
                <Link
                  className="locations__item-link"
                  to={AppRoute.Main}
                  onClick={handleNavigateToRandomCity}
                >
                  <span>{randomCity}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
      :
      <Navigate to={AppRoute.Main} />
  );
}

export default Login;
