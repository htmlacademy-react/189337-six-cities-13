import { Link } from 'react-router-dom';
import { AppRoute, LogoIconConfig } from '../../const';
import classNames from 'classnames';

type LogoProps = {
  className?: string;
  isActive?: boolean;
}

function Logo({ className = 'header', isActive = false }: LogoProps): JSX.Element {
  const isFooter = className === 'footer';
  const iconWidth: LogoIconConfig = isFooter ? LogoIconConfig.footerWidth : LogoIconConfig.baseWidth;
  const iconHeight: LogoIconConfig = isFooter ? LogoIconConfig.footerHeight : LogoIconConfig.baseHeight;

  return (
    <Link
      className={classNames(`${className}__logo-link`, {
        [`${className}__logo-link--active`]: isActive
      })}
      to={AppRoute.Main}
    >
      <img
        className={`${className}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={iconWidth}
        height={iconHeight}
      />
    </Link>
  );
}

export default Logo;
