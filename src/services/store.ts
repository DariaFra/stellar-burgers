import {
  combineReducers,
  configureStore,
  createSelector
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/ingredientSlice';
import feedReducer from './slices/feedSlice';
import orderBurgerReducer from './slices/orderBurgerSlice';
import profileReducer from './slices/profileOrdersSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  orderBurger: orderBurgerReducer,
  profileOrders: profileReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// const store = createStore(
//   rootReducer
// );

export type RootState = ReturnType<typeof rootReducer>;
// store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
