import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({
  children
}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    isAuth ? children : <Navigate to={AppRoute.Login} />
  );
}
