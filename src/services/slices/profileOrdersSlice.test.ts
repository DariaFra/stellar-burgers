import reducer, { initialState } from './profileOrdersSlice';
import { getOrders } from '../actions/profileOrdersAction';

describe('profileOrdersSlice', () => {
  it('должен обрабатывать getOrders.pending', () => {
    const action = { type: getOrders.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать getOrders.rejected', () => {
    const errorMessage = 'Ошибка getOrders';
    const action = {
      type: getOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('должен обрабатывать getOrders.fulfilled', () => {
    const mockResponse = [
      {
        _id: '6764039d750864001d372aa9',
        status: 'done',
        name: 'Краторный бессмертный бургер',
        createdAt: '2024-12-19T11:29:33.417Z',
        updatedAt: '2024-12-19T11:29:34.443Z',
        number: 63440,
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f']
      }
    ];
    const action = { type: getOrders.fulfilled.type, payload: mockResponse };
    const state = reducer(initialState, action);

    expect(state.profileOrders).toEqual(mockResponse);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });
});
