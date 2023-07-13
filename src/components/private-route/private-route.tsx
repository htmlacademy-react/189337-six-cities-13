import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
}

export default function PrivateRoute({
  isAuth, children
}: PrivateRouteProps): JSX.Element {
  return (
    isAuth ? children : <Navigate to={AppRoute.Login} />
  );
}
