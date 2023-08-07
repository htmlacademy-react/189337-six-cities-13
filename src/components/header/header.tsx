import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-action';

type HeaderProps = {
  activeLogo?: boolean;
  showNav?: boolean;
}

export default function Header({ activeLogo = false, showNav = true }: HeaderProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  const handleLogout = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo active={activeLogo} />
          </div>
          {showNav &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {
                  isAuth ?
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{user?.email}</span>
                          <span className="header__favorite-count">{favorites.length}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to="#"
                          onClick={handleLogout}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                    :
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                }
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}
