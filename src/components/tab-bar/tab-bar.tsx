import { Settings, TAB_BAR_CITIES } from '../../const';
import TabBarItem from '../tab-bar-item/tab-bar-item';

export default function TabBar(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {TAB_BAR_CITIES.map((city) => <TabBarItem key={`${city}`} title={city} isActive={city === Settings.activeCity} />)}
        </ul>
      </section>
    </div>
  );
}
