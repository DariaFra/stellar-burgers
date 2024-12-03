import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderBurger = createAsyncThunk(
  'orderBurger/',
  async (data: string[]) => orderBurgerApi(data)
);

interface IOrderBurgerState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

const initialState: IOrderBurgerState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    orderCancel(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    orderRequest: (state) => state.orderRequest,
    orderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { orderRequest, orderModalData } = orderBurgerSlice.selectors;
export const { orderCancel } = orderBurgerSlice.actions;
export default orderBurgerSlice.reducer;
