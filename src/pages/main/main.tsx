import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import TabBar from '../../components/tab-bar/tab-bar';
import { CITIES } from '../../const';
import Cities from '../../components/cities/cities';


function Main(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header activeLogo />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <TabBar items={CITIES} />
        <Cities />
      </main>
    </div>
  );
}

export default Main;
