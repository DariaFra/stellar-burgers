import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds, getOrderByNumber } from '../actions/feedAction';
import { RootState } from '../store';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  orderNumber: TOrder | null;
  error: string | null | undefined;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  orderNumber: null,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      });
  }
});

export const selectTotal = (state: RootState) => state.feed.total;
export const selectTotalToday = (state: RootState) => state.feed.totalToday;
export const selectOrders = (state: RootState) => state.feed.orders;
export const selectOrderNumber = (state: RootState) => state.feed.orderNumber;
export const selectIsLoading = (state: RootState) => state.feed.isLoading;

export const {} = feedSlice.actions;
export default feedSlice.reducer;
