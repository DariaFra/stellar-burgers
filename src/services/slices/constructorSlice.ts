import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderBurger } from '../actions/constructorAction';
import { RootState } from '../store';

export interface IOrderBurgerState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

export const initialState: IOrderBurgerState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const constructorSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    orderCancel(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
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

export const orderRequest = (state: RootState) =>
  state.orderBurger.orderRequest;
export const orderModalData = (state: RootState) =>
  state.orderBurger.orderModalData;

export const { orderCancel } = constructorSlice.actions;
export default constructorSlice.reducer;
