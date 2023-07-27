import classNames from 'classnames';
import { Link } from 'react-router-dom';

type TabBarItemProps = {
  title: string;
  isActive?: boolean;
}

export default function TabBarItem({ title, isActive = false }: TabBarItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <Link className={classNames({ 'tabs__item--active': isActive }, 'locations__item-link', 'tabs__item')} to="#">
        <span>{title}</span>
      </Link>
    </li >
  );
}
