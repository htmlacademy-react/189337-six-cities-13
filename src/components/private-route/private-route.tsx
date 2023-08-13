import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';
import { getIsAuth } from '../../store/user-process/selectors';
import { getIsLoading } from '../../store/global-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({
  children
}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const isLoading = useAppSelector(getIsLoading);
  if (isLoading) {
    return <Loader />;
  }
  return (
    isAuth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
