import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { ActionGroup, AppRoute, RequestStatus } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeEmptyUserState, makeFakeStore } from '../../utils/mock';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const mainContainerTestId = 'main-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(mainContainerTestId)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const loginContainerTestId = 'login-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(loginContainerTestId)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    const favoritesContainerTestId = 'favorites-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [ActionGroup.User]: {
        ...makeEmptyUserState(), isAuth: true, fetch: {
          check: RequestStatus.Success,
          login: RequestStatus.Idle,
          logout: RequestStatus.Idle
        }
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId(favoritesContainerTestId)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const notFoundContainerTestId = 'not-found-container';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByTestId(notFoundContainerTestId)).toBeInTheDocument();
  });
});
