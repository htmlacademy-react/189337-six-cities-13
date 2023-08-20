import { render, screen } from '@testing-library/react';
import ButtonBookmark from './button-bookmark';
import { withHistory, withStore } from '../../utils/mock-component';
import { extractActionsTypes, makeEmptyUserState, makeFakeOffer, makeFakeStore } from '../../utils/mock';
import userEvent from '@testing-library/user-event';
import { MemoryHistory, createMemoryHistory } from 'history';
import { ActionGroup, AppRoute } from '../../const';
import { addOfferToFavorites } from '../../store/api-action';

describe('Component: ButtonBookmark', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correct', () => {
    const buttonBookmarkTestId = 'button-bookmark';
    const offer = makeFakeOffer();

    const withHistoryComponent = withHistory(<ButtonBookmark className="offer" isActive={false} offer={offer} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);
    const buttonBookmark = screen.getByTestId(buttonBookmarkTestId);

    expect(buttonBookmark).toBeInTheDocument();
  });

  it('onClick should go to Login page if not Auth', async () => {
    const offer = makeFakeOffer();

    const withHistoryComponent = withHistory(<ButtonBookmark className="offer" isActive={false} offer={offer} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('onClick should add action addOfferToFavorites if Auth', async () => {
    const offer = makeFakeOffer();

    const withHistoryComponent = withHistory(<ButtonBookmark className="offer" isActive={false} offer={offer} />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, { ...makeFakeStore(), [ActionGroup.User]: { ...makeEmptyUserState(), isAuth: true } });
    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions.at(1)).toEqual(addOfferToFavorites.rejected.type);
  });
});
