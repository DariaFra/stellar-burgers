import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';
import { getIngredients } from '../actions/ingredientAction';

interface IIngredientState {
  ingredients: TIngredient[];
  bun: TIngredient | null;
  currentIngredient: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IIngredientState = {
  ingredients: [],
  bun: null,
  currentIngredient: [],
  isLoading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },

    addCurrentIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      }),
      reducer: (state, action: PayloadAction<TIngredient & { id: string }>) => {
        state.currentIngredient.push(action.payload);
      }
    },
    removeIngredients(state) {
      state.bun = null;
      state.currentIngredient = [];
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.currentIngredient.splice(action.payload, 1);
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const current = state.currentIngredient[action.payload];
      state.currentIngredient[action.payload] =
        state.currentIngredient[action.payload + 1];
      state.currentIngredient[action.payload + 1] = current;
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const current = state.currentIngredient[action.payload];
      state.currentIngredient[action.payload] =
        state.currentIngredient[action.payload - 1];
      state.currentIngredient[action.payload + 1] = current;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const {
  addBun,
  addCurrentIngredient,
  removeIngredient,
  removeIngredients,
  moveIngredientUp,
  moveIngredientDown
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
