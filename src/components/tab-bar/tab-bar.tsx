import TabBarItem from '../tab-bar-item/tab-bar-item';

type TabBarProps = {
  items: readonly string[];
  activeItem?: string;
}

export default function TabBar({ items, activeItem }: TabBarProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {items.map((item) => <TabBarItem key={`${item}`} title={item} isActive={item === activeItem} />)}
        </ul>
      </section>
    </div>
  );
}
