import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './slices/ingredientSlice';
import { initialState as feedInitialState } from './slices/feedSlice';
import { initialState as orderBurgerInitialState } from './slices/constructorSlice';
import { initialState as profileOrdersInitialState } from './slices/profileOrdersSlice';
import { initialState as userInitialState } from './slices/userSlice';

describe('rootReducer', () => {
  it('должен вернуть корректное initialState для всех слайсов', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.ingredients).toEqual(ingredientsInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.orderBurger).toEqual(orderBurgerInitialState);
    expect(state.profileOrders).toEqual(profileOrdersInitialState);
    expect(state.user).toEqual(userInitialState);
  });

  it('не должен изменять состояние при неизвестном экшене', () => {
    const prevState = rootReducer(undefined, { type: '@@INIT' });
    const newState = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });

    expect(newState).toEqual(prevState);
  });
});
