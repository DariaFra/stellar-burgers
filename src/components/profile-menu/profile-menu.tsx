import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { getLogout } from '../../services/slices/userSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(getLogout())
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/');
        }
      });
  }, []);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
