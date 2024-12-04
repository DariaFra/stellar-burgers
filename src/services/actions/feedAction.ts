import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/', async () => getFeedsApi());

export const getOrderByNumber = createAsyncThunk(
  'feeds/orderNumberByNumber',
  async (data: number) => {
    const res = await getOrderByNumberApi(data);
    return res.orders[0];
  }
);
