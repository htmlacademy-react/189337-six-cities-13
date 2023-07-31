import { useAppSelector } from '../../hooks';
import { Cities } from '../../types/city';
import TabBarItem from '../tab-bar-item/tab-bar-item';

type TabBarProps = {
  items: readonly Cities[];
}

export default function TabBar({ items }: TabBarProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);

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
