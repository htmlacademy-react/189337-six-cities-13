import classNames from 'classnames';
import { addOfferToFavorites } from '../../store/api-action';
import { Offer, OfferDetails } from '../../types/offers';
import { getIsAuth } from '../../store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

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

  const handleAddOfferToFavorites = () => {
    if (isAuth) {
      dispatch(addOfferToFavorites(offer));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button className={
      classNames({
        [`${className}__bookmark-button--active`]: isActive
      }, `${className}__bookmark-button`, 'button')
    }
    type="button"
    onClick={handleAddOfferToFavorites}
    >
      <svg className={`${className}__bookmark-icon`} width={isOnOffer ? 31 : 18} height={isOnOffer ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default ButtonBookmark;
