import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import {
  getLogin,
  getLogout,
  getRegisterUser,
  getUpdateUser
} from '../actions/userAction';

export interface IRegisterState {
  user: TUser;
  isAuth: boolean;
  isChecked: boolean;
  error: string | null | undefined;
}

export const initialState: IRegisterState = {
  user: {
    name: '',
    email: ''
  },
  isAuth: false,
  isChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegisterUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getRegisterUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isChecked = true;
      })

      .addCase(getLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(getLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isChecked = true;
      })

      .addCase(getUpdateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUpdateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(getLogout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getLogout.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.user = { name: '', email: '' };
        }
      });
  }
});

export const selectorUser = (state: RootState) => state.user.user;
export const selectorIsUserAuth = (state: RootState) => state.user.isAuth;
export const selectorIsUserChecked = (state: RootState) => state.user.isChecked;
export const { setUser, setAuth, setChecked } = userSlice.actions;
export default userSlice.reducer;
