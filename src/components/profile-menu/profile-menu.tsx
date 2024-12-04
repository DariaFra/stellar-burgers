import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { getLogout } from '../../services/actions/userAction';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(getLogout());
  }, []);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
