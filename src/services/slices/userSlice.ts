import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';
import { RootState } from '../store';

export const getRegisterUser = createAsyncThunk(
  'register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getLogin = createAsyncThunk('login', async (data: TLoginData) => {
  const res = await loginUserApi(data);
  setCookie('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const getUser = createAsyncThunk('auth/user', getUserApi);

export const getLogout = createAsyncThunk('user/logout', logoutApi);

export const getUpdateUser = createAsyncThunk(
  'update',
  async (data: TRegisterData) => updateUserApi(data)
);

interface IRegisterState {
  user: TUser;
  isAuth: boolean;
  isChecked: boolean;
  error: string | null | undefined;
}

const initialState: IRegisterState = {
  user: {
    name: '',
    email: ''
  },
  isAuth: false,
  isChecked: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
      .addCase(getUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isChecked = true;
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
export const {} = userSlice.actions;
export default userSlice.reducer;
