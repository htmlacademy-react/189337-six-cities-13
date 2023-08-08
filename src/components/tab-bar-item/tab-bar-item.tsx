import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeActiveCity } from '../../store/action';
import { Cities } from '../../types/city';

type TabBarItemProps = {
  title: Cities;
  isActive?: boolean;
}

export default function TabBarItem({ title, isActive = false }: TabBarItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <Link
        className={classNames({ 'tabs__item--active': isActive }, 'locations__item-link', 'tabs__item')}
        to="#"
        onClick={(event) => {
          event.preventDefault();
          dispatch(changeActiveCity(title));
        }}
      >
        <span>{title}</span>
      </Link>
    </li >
  );
}
