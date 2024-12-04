import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderBurger = createAsyncThunk(
  'orderBurger/',
  async (data: string[]) => orderBurgerApi(data)
);
