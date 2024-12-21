import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';
import { getOrders } from '../actions/profileOrdersAction';

export interface IProfileOrdersState {
  profileOrders: TOrder[];
  isLoading: boolean;
  error: string | null | undefined;
}

export const initialState: IProfileOrdersState = {
  profileOrders: [],
  isLoading: false,
  error: null
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.profileOrders = action.payload;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export const selectOrdersProfile = (state: RootState) =>
  state.profileOrders.profileOrders;
export const selectIsLoadingProfile = (state: RootState) =>
  state.profileOrders.isLoading;
export const {} = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
