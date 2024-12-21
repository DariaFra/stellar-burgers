import reducer, {
  initialState,
  setUser,
  setAuth,
  setChecked
} from './userSlice';
import {
  getRegisterUser,
  getLogin,
  getLogout,
  getUpdateUser,
  getUser
} from '../actions/userAction';

import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { getCookie, setCookie } from '../../utils/cookie';
import 'jest-localstorage-mock';

describe('userSlice', () => {
  it('должен установить пользователя через setUser', () => {
    const user = { name: 'Иван Иванов', email: 'ivan.ivanov@example.com' };
    const state = reducer(initialState, setUser(user));

    expect(state.user).toEqual(user);
  });

  it('должен установить isAuth через setAuth', () => {
    const state = reducer(initialState, setAuth(true));

    expect(state.isAuth).toBe(true);
  });

  it('должен установить isChecked через setChecked', () => {
    const state = reducer(initialState, setChecked(true));

    expect(state.isChecked).toBe(true);
  });

  it('должен обрабатывать getRegisterUser.pending', () => {
    const action = { type: getRegisterUser.pending.type };
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
  });
});

describe('getRegisterUser', () => {
  it('должен обрабатывать getRegisterUser.rejected', () => {
    const errorMessage = 'Ошибка getRegisterUser';
    const action = {
      type: getRegisterUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.error).toBe(errorMessage);
  });

  it('должен обрабатывать getRegisterUser.fulfilled', () => {
    const user = { name: 'Иван Иванов', email: 'ivan.ivanov@example.com' };
    const action = { type: getRegisterUser.fulfilled.type, payload: user };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isChecked).toBe(true);
  });
});

describe('getLogin', () => {
  it('должен обрабатывать getLogin.pending', () => {
    const action = { type: getLogin.pending.type };
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state).toEqual({
      ...initialState,
      error: null
    });
  });

  it('должен обрабатывать getLogin.rejected', () => {
    const errorMessage = 'Ошибка getLogin';
    const action = {
      type: getLogin.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.error).toBe(errorMessage);
    expect(state.isAuth).toBe(false);
    expect(state.isChecked).toBe(false);
  });

  it('должен обрабатывать getLogin.fulfilled', () => {
    const user = { name: 'Иван Иванов', email: 'ivan.ivanov@example.com' };
    const action = { type: getLogin.fulfilled.type, payload: user };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isChecked).toBe(true);
    expect(state.error).toBe(null);
  });
});

describe('getUpdateUser', () => {
  it('должен обрабатывать getUpdateUser.pending', () => {
    const action = { type: getUpdateUser.pending.type };
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state).toEqual({
      ...initialState,
      error: null
    });
  });

  it('должен обрабатывать getUpdateUser.rejected', () => {
    const errorMessage = 'Ошибка getUpdateUser';
    const action = {
      type: getUpdateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.error).toBe(errorMessage);
    expect(state.isAuth).toBe(false);
    expect(state.isChecked).toBe(false);
  });

  it('должен обрабатывать getUpdateUser.fulfilled', () => {
    const updatedUser = {
      name: 'Иван Иванов',
      email: 'ivan.ivanov@example.com'
    };
    const action = {
      type: getUpdateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = reducer(initialState, action);

    expect(state.user).toEqual(updatedUser);
    expect(state.error).toBe(null);
  });
});

describe('getLogout', () => {
  it('должен обрабатывать getLogout.pending', () => {
    const action = { type: getLogout.pending.type };
    const state = reducer(initialState, action);

    expect(state.error).toBe(null);
    expect(state).toEqual({
      ...initialState,
      error: null
    });
  });

  it('должен обрабатывать getLogout.rejected', () => {
    const errorMessage = 'Ошибка getLogout';
    const action = {
      type: getLogout.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.error).toBe(errorMessage);
    expect(state.user).toEqual(initialState.user);
  });

  it('должен обрабатывать getLogout.fulfilled', () => {
    const initialStateWithUser = {
      ...initialState,
      user: {
        name: 'Иван Иванов',
        email: 'ivan.ivanov@example.com'
      },
      isAuth: true
    };
    const action = {
      type: getLogout.fulfilled.type,
      payload: { success: true },
      error: null
    };
    const state = reducer(initialStateWithUser, action);

    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать getLogout.fulfilled', () => {
    const initialStateWithUser = {
      ...initialState,
      user: {
        name: 'Иван Иванов',
        email: 'ivan.ivanov@example.com'
      },
      isAuth: true
    };
    const action = {
      type: getLogout.fulfilled.type,
      payload: { success: false }
    };
    const state = reducer(initialStateWithUser, action);

    expect(state.user).toEqual({
      name: 'Иван Иванов',
      email: 'ivan.ivanov@example.com'
    });
    expect(state.error).toBe(null);
  });
});

jest.mock('../../utils/burger-api');
jest.mock('../../utils/cookie');
jest.spyOn(localStorage, 'setItem');

describe('getRegisterUser async', () => {
  it('должен регистрировать пользователя и сохранять токены', async () => {
    const mockData = {
      email: 'ivan.ivanov@example.com',
      name: 'Иван Иванов',
      password: '12345'
    };
    const mockResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      user: { name: 'Иван Иванов', email: 'ivan.ivanov@example.com' }
    };
    (registerUserApi as jest.Mock).mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const state = jest.fn();

    const result = await getRegisterUser(mockData)(dispatch, state, undefined);

    expect(registerUserApi).toHaveBeenCalledWith(mockData);
    expect(setCookie).toHaveBeenCalledWith(
      'accessToken',
      mockResponse.accessToken
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      mockResponse.refreshToken
    );
    expect(result.payload).toEqual(mockResponse.user);
  });
});

describe('getLogin async', () => {
  it('должен выполнять вход и сохранять токены', async () => {
    const mockData = { email: 'ivan.ivanov@example.com', password: '12345' };
    const mockResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      user: { name: 'Иван Иванов', email: 'ivan.ivanov@example.com' }
    };

    (loginUserApi as jest.Mock).mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const state = jest.fn();

    const result = await getLogin(mockData)(dispatch, state, undefined);

    expect(loginUserApi).toHaveBeenCalledWith(mockData);
    expect(setCookie).toHaveBeenCalledWith(
      'accessToken',
      mockResponse.accessToken
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      mockResponse.refreshToken
    );
    expect(result.payload).toEqual(mockResponse.user);
  });
});

describe('getUser async', () => {
  it('должен загружать данные пользователя при наличии токена', async () => {
    const mockResponse = {
      name: 'Иван Иванов',
      email: 'ivan.ivanov@example.com'
    };

    (getCookie as jest.Mock).mockReturnValue('accessToken');
    (getUserApi as jest.Mock).mockResolvedValue({ user: mockResponse });

    const dispatch = jest.fn();
    const state = jest.fn();

    await getUser()(dispatch, state, undefined);

    expect(getUserApi).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setUser(mockResponse));
    expect(dispatch).toHaveBeenCalledWith(setAuth(true));
    expect(dispatch).toHaveBeenCalledWith(setChecked(true));
  });

  it('должен установить checked=true при отсутствии токена', async () => {
    (getCookie as jest.Mock).mockReturnValue(null);

    const dispatch = jest.fn();
    const state = jest.fn();

    await getUser()(dispatch, state, undefined);

    expect(dispatch).toHaveBeenCalledWith(setChecked(true));
    expect(dispatch).not.toHaveBeenCalledWith(setUser(expect.anything()));
    expect(dispatch).not.toHaveBeenCalledWith(setAuth(true));
  });
});

describe('getUpdateUser async', () => {
  it('должен обновлять данные пользователя', async () => {
    const mockData = {
      name: 'Иван Иванов',
      email: 'ivan.ivanov@example.com',
      password: '12345'
    };
    const mockResponse = { mockData };

    (updateUserApi as jest.Mock).mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const state = jest.fn();

    const result = await getUpdateUser(mockData)(dispatch, state, undefined);

    expect(updateUserApi).toHaveBeenCalledWith(mockData);
    expect(result.payload).toEqual(mockResponse);
  });
});
