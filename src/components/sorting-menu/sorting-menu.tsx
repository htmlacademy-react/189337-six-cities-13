import classNames from 'classnames';
import { SORTING_MENUS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeActiveSort, toggleSortingMenu } from '../../store/action';
import { useCallback, useEffect, useRef } from 'react';

function SortingMenu() {
  const activeSort = useAppSelector((state) => state.sortingMenu.activeSort);
  const isVisible = useAppSelector((state) => state.sortingMenu.visible);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLFormElement>(null);

  const handleDocumentClick = useCallback((event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      dispatch(toggleSortingMenu(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  }, [isVisible, handleDocumentClick]);

  const handleToggleSortingMenu = () => {
    dispatch(toggleSortingMenu(!isVisible));
  };

  return (
    <form className="places__sorting" action="#" method="get" ref={menuRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleSortingMenu}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames({ 'places__options--opened': isVisible }, 'places__options', 'places__options--custom')}>
        {
          SORTING_MENUS.map((sortingType) =>
            (
              <li
                key={sortingType}
                className={classNames({ 'places__option--active': activeSort === sortingType }, 'places__option')}
                tabIndex={0}
                onClick={() => {
                  dispatch(changeActiveSort(sortingType));
                  dispatch(toggleSortingMenu(false));
                }}
              >{sortingType}
              </li>
            )
          )
        }
      </ul>
    </form>
  );
}

export default SortingMenu;
