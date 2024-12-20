import { getOrderBurger } from '../actions/constructorAction';
import reducer, { initialState, orderCancel } from '../slices/constructorSlice';
describe('constructorSlice', () => {
  it('должен обрабатывать getOrderBurger.pending', () => {
    const action = {type: getOrderBurger.pending.type};
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(null);
  })

  it('должен обрабатывать getOrderBurger.rejected', () => {
      const errorMessage = 'Ошибка getOrderBurger';
      const action = {type: getOrderBurger.rejected.type, error: {message: errorMessage}}
      const state = reducer(initialState, action)
      expect(state.error).toBe(errorMessage)
  })

  it('должен обрабатывать getOrderBurger.fulfilled', () => {
    const mockResponse = {
      order: 
            {
              _id: '66ed7358119d45001b507ef4',
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2024-09-20T13:06:32.642Z',
              updatedAt: '2024-09-20T13:06:33.485Z',
              number: 53445,
              ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
            }
    }
    const action = {type: getOrderBurger.fulfilled.type, payload: mockResponse}
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orderModalData).toEqual(mockResponse.order)
  })

  it('orderCancel', () => {
    const stateBeforeCancel = {
      ...initialState,
      orderRequest: true,
      orderModalData: 
            {
              _id: '66ed7358119d45001b507ef4',
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2024-09-20T13:06:32.642Z',
              updatedAt: '2024-09-20T13:06:33.485Z',
              number: 53445,
              ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
            }
    }
    const state = reducer(stateBeforeCancel, orderCancel())

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBe(null);
  })
});
