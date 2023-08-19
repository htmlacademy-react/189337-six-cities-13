import classNames from 'classnames';
import { addOfferToFavorites } from '../../store/api-action';
import { Offer, OfferDetails } from '../../types/offers';
import { getIsAuth } from '../../store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoute, BookmarkIconConfig } from '../../const';

type ButtonBookmarkProps = {
  className: string;
  isActive: boolean;
  offer: Offer | OfferDetails;
}

function ButtonBookmark({ className, isActive, offer }: ButtonBookmarkProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  const isOnOffer = className === 'offer';
  const iconWidth: BookmarkIconConfig = isOnOffer ? BookmarkIconConfig.offerWidth : BookmarkIconConfig.baseWidth;
  const iconHeight: BookmarkIconConfig = isOnOffer ? BookmarkIconConfig.offerHeight : BookmarkIconConfig.baseHeight;

  const handleAddOfferToFavorites = () => {
    if (isAuth) {
      dispatch(addOfferToFavorites(offer));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className={
        classNames({
          [`${className}__bookmark-button--active`]: isActive
        }, `${className}__bookmark-button`, 'button')
      }
      type="button"
      onClick={handleAddOfferToFavorites}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default ButtonBookmark;
