import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { selectIsLoading } from './feedSlice';

export const getOrders = createAsyncThunk('profileOrders', getOrdersApi);

interface IProfileOrdersState {
  profileOrders: TOrder[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IProfileOrdersState = {
  profileOrders: [],
  isLoading: true,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersProfile: (state) => state.profileOrders,
    selectIsLoadingProfile: (state) => state.isLoading
  },
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
        state.isLoading = false;
        state.profileOrders = action.payload;
      });
  }
});

export const { selectOrdersProfile, selectIsLoadingProfile } =
  profileOrdersSlice.selectors;
export const {} = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
