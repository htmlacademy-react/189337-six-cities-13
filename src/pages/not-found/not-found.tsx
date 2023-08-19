import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';

function NotFound(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Helmet>
        <title>6 cities: not found</title>
      </Helmet>
      <Header showNav={false}/>
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">404 Page not found</h1>
            <div className={styles.wrapper}>
              <b className={`favorites__status ${styles.title}`}>404</b>
              <b className="favorites__status">Page not found</b>
              <p className="favorites__status-description">We couldn&apos;t find that page, please check the URL and try again.</p>
              <Link
                className={`form__submit button ${styles['button-back']}`}
                to={AppRoute.Main}
              >
                Go to main
              </Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Logo isFooter />
      </footer>
    </div>
  );
}

export default NotFound;
