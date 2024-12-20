import { getFeeds, getOrderByNumber } from '../actions/feedAction';
import reducer, { initialState } from './feedSlice';
import { getOrderByNumberApi } from '../../utils/burger-api';

describe('feedSlice', () => {
  it('должен обрабатывать getFeeds.pending', () => {
    const action = {type: getFeeds.pending.type};
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  })

  it('должен обрабатывать getFeeds.rejected', () => {
    const errorMessage = 'Ошибка getFeeds'
    const action = {type: getFeeds.rejected.type, error: {message: errorMessage}};
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  })

  it('должен обрабатывать getFeeds.fulfilled', () => {
    const mockResponse = {
      orders: [
            {
              _id: '66ed7358119d45001b507ef4',
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2024-09-20T13:06:32.642Z',
              updatedAt: '2024-09-20T13:06:33.485Z',
              number: 53445,
              ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
            }
          ],
          total: 23,
          totalToday: 3
    }
    const action = {type: getFeeds.fulfilled.type, payload: mockResponse}
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockResponse.orders);
    expect(state.total).toBe(mockResponse.total);
    expect(state.totalToday).toBe(mockResponse.totalToday);
    expect(state.error).toBe(null);
  })

  it('должен обрабатывать getOrderByNumber.pending', () => {
    const action = {type: getFeeds.pending.type};
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  })

  it('должен обрабатывать getOrderByNumber.rejected', () => {
    const errorMessage = 'Ошибка getOrderByNumber'
    const action = {type: getOrderByNumber.rejected.type, error: {message: errorMessage}};
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  })

  it('должен обрабатывать getOrderByNumber.fulfilled', () => {
    const mockResponse = 12345;
  
    const action = {type: getOrderByNumber.fulfilled.type, payload: mockResponse}
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orderNumber).toBe(mockResponse);
    expect(state.error).toBe(null);
  })
})

jest.mock('../../utils/burger-api');

describe('getOrderByNumber', () => {
  it('должен получать данные заказа по номеру', async () => {
    const mockOrderNumber = 12345;
    const mockResponse = {
      orders: [
        {
          _id: '66ed7358119d45001b507ef4',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-09-20T13:06:32.642Z',
          updatedAt: '2024-09-20T13:06:33.485Z',
          number: mockOrderNumber,
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
        },
      ],
    };

    (getOrderByNumberApi as jest.Mock).mockResolvedValue(mockResponse)

    const dispatch = jest.fn();
    const state = jest.fn();
    const result = await getOrderByNumber(mockOrderNumber)(dispatch, state, undefined);

    expect(result.payload).toEqual(mockResponse.orders[0]);
    expect(getOrderByNumberApi).toHaveBeenCalledWith(mockOrderNumber)
  })
})
