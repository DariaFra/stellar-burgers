import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import {
  getOrders,
  selectOrdersProfile
} from '../../services/slices/profileOrdersSlice';
import { getFeeds } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
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
