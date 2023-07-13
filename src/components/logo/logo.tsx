import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  active?: boolean;
  isFooter?: boolean;
}

export default function Logo({ active = false, isFooter = false }: LogoProps): JSX.Element {
  const classType = isFooter ? 'footer' : 'header';
  return (
    <Link className={`${classType}__logo-link ${active ? 'header__logo-link--active' : ''}`} to={AppRoute.Main}>
      <img
        className={`${classType}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={isFooter ? 64 : 81}
        height={isFooter ? 33 : 41}
      />
    </Link>
  );
}
