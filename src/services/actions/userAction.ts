import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
import { setAuth, setChecked, setUser } from '../slices/userSlice';

export const getRegisterUser = createAsyncThunk(
  'use/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await getUserApi()
        .then((res) => {
          dispatch(setUser(res.user));
          dispatch(setAuth(true));
        })
        .finally(() => {
          dispatch(setChecked(true));
        });
    } else {
      dispatch(setChecked(true));
    }
  }
);

export const getLogout = createAsyncThunk('user/logout', logoutApi);

export const getUpdateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => updateUserApi(data)
);
