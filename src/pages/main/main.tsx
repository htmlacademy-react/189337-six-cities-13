import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import TabBar from '../../components/tab-bar/tab-bar';
import { CITIES } from '../../const';
import Cities from '../../components/cities/cities';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getOffersSorted } from '../../store/cities-process/selectors';


function Main(): JSX.Element {
  const offers = useAppSelector(getOffersSorted);

  const isEmpty = !offers.length;

  return (
    <div
      className={classNames('page', 'page--gray', 'page--main', {
        'page__main--index-empty': isEmpty
      })}
    >
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header isActiveLogo />
      <main
        className="page__main page__main--index"
        data-testid="main-container"
      >
        <h1 className="visually-hidden">Cities</h1>
        <TabBar items={CITIES} />
        <Cities />
      </main>
    </div>
  );
}

export default Main;
