import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import { Offer } from '../../types/offers';

type FavoritesProps = {
  offers: Offer [];
}

export default function Favorites({ offers }: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <CardList isMain={false} offers={offers}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo isFooter />
      </footer>
    </div>
  );
}
