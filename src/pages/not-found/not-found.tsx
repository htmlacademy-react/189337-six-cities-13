import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';
import './not-found.css';

export default function NotFound(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">404 Page not found</h1>
            <div className="not-found__status-wrapper">
              <b className="favorites__status not-found__status-title">404</b>
              <b className="favorites__status">Page not found</b>
              <p className="favorites__status-description">We couldn&apos;t find that page, please check the URL and try again.</p>
              <Link
                className="form__submit button not-found__button-back"
                to="/"
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
