import { Navigate } from 'react-router-dom';
import { AppRoute, RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';
import { getCheckAuthStatus, getIsAuth } from '../../store/user-process/selectors';
import { getIsLoading } from '../../store/global-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({
  children
}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);
  const isLoading = useAppSelector(getIsLoading);
  const checkAuthStatus = useAppSelector(getCheckAuthStatus);

  if (isLoading || checkAuthStatus === RequestStatus.Idle) {
    return <Loader />;
  }
  return (
    isAuth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
