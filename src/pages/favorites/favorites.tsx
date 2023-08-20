import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import GroupCardList from '../../components/group-card-list/group-card-list';
import { useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { getFavorites } from '../../store/favorites-process/selectors';

function Favorites(): JSX.Element {
  const offers = useAppSelector(getFavorites);
  const isNotEmpty = !!offers.length;

  return (
    <div className={classNames('page', { 'page--favorites-empty': !isNotEmpty })}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main
        className={classNames('page__main', 'page__main--favorites', { 'page__main--favorites-empty': !isNotEmpty })}
        data-testid="favorites-container"
      >
        <div className="page__favorites-container container">
          <section className={classNames('favorites', { 'favorites--empty': !isNotEmpty })}>
            {
              isNotEmpty ?
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <GroupCardList />
                </>
                :
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
            }

          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo className="footer" />
      </footer>
    </div>
  );
}

export default Favorites;
