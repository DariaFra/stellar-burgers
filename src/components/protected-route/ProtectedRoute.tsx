import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import {
  selectorIsUserChecked,
  selectorUser
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  authUser?: boolean;
};

export const ProtectedRoute = ({ children, authUser }: ProtectedRouteProps) => {
  const isUserChecked = useSelector(selectorIsUserChecked);
  const user = useSelector(selectorUser);
  const location = useLocation();

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (!authUser && !user.name) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (authUser && user.name) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
