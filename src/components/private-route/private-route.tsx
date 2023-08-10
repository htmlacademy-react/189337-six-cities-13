import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import Loader from '../loader/loader';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({
  children
}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  if (isLoading) {
    return <Loader />;
  }
  return (
    isAuth ? children : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
