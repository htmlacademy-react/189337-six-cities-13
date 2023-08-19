import { useAppSelector } from '../../hooks';
import { getActiveCity } from '../../store/cities-process/selectors';
import { Cities } from '../../types/city';
import TabBarItem from '../tab-bar-item/tab-bar-item';

type TabBarProps = {
  items: readonly Cities[];
}

function TabBar({ items }: TabBarProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {items.map((item) => <TabBarItem key={`${item}`} title={item} isActive={item === activeCity} />)}
        </ul>
      </section>
    </div>
  );
}

export default TabBar;
