import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import {
  getOrders,
  selectOrdersProfile
} from '../../services/slices/profileOrdersSlice';
import { getFeeds } from '../../services/actions/feedAction';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersProfile);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
