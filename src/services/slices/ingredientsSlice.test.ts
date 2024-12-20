import { TIngredient } from '@utils-types';
import {
  addBun,
  addCurrentIngredient,
  ingredientsSlice,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  removeIngredients
} from '../slices/ingredientSlice';

const mockBun: TIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockMainIngredient: TIngredient = {
  _id: '2',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

const mockSauceIngredient: TIngredient = {
  _id: '3',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('ingredientsSlice', () => {
  describe('добавление ингредиента', () => {
    it('добавление bun', () => {
      const expectedResult = {
        ...initialState,
        bun: mockBun
      };
      const state = ingredientsSlice.reducer(initialState, addBun(mockBun));

      expect(state).toEqual(expectedResult);
    });

    it('добавление main ингредиента', () => {
      const expectedResult = {
        ...initialState,
        bun: null,
        currentIngredient: [{ ...mockMainIngredient, id: expect.any(String) }]
      };

      const state = ingredientsSlice.reducer(
        initialState,
        addCurrentIngredient(mockMainIngredient)
      );

      expect(state).toEqual(expectedResult);
    });

    it('добавление souce', () => {
      const expectedResult = {
        ...initialState,
        bun: null,
        currentIngredient: [{ ...mockSauceIngredient, id: expect.any(String) }]
      };
      const state = ingredientsSlice.reducer(
        initialState,
        addCurrentIngredient(mockSauceIngredient)
      );

      expect(state).toEqual(expectedResult);
    });
  });

  describe('удаление ингредиента', () => {
    it('удаление одного ингредиента', () => {
      const initialStateWithIngredients = {
        ...initialState,
        bun: mockBun,
        currentIngredient: [
          { ...mockMainIngredient, id: '2' },
          { ...mockSauceIngredient, id: '3' }
        ]
      };
      const expectedResult = {
        ...initialState,
        bun: mockBun,
        currentIngredient: [{ ...mockSauceIngredient, id: '3' }]
      };
      const state = ingredientsSlice.reducer(
        initialStateWithIngredients,
        removeIngredient(0)
      );
      expect(state).toEqual(expectedResult);
    });

    it('удаление всех ингредиентов', () => {
      const initialStateWithIngredients = {
        ...initialState,
        bun: mockBun,
        currentIngredient: [
          { ...mockMainIngredient, id: '2' },
          { ...mockSauceIngredient, id: '3' }
        ]
      };
      const expectedResult = {
        ...initialState,
        bun: null,
        currentIngredient: [] 
      };
      const state = ingredientsSlice.reducer(
        initialStateWithIngredients,
        removeIngredients()
      );

      expect(state).toEqual(expectedResult);
    });
  });
});

describe('изменение порядка ингредиентов в начинке', () => {
  it('перемещение ингредиента вверх', () => {
    const initialStateWithIngredients = {
      ...initialState,
      bun: mockBun,
      currentIngredient: [
        { ...mockMainIngredient, id: '2' },
        { ...mockSauceIngredient, id: '3' }
      ]
    };
    const expectedResult = {
      ...initialState,
      bun: mockBun,
      currentIngredient: [
        { ...mockSauceIngredient, id: '3' },
        { ...mockMainIngredient, id: '2' }
      ]
    };
    const state = ingredientsSlice.reducer(
      initialStateWithIngredients,
      moveIngredientUp(1)
    );

    expect(state).toEqual(expectedResult);
  });

  it('перемещение ингредиента вниз', () => {
    const initialStateWithIngredients = {
      ...initialState,
      bun: mockBun,
      currentIngredient: [
        { ...mockMainIngredient, id: '2' },
        { ...mockSauceIngredient, id: '3' }
      ]
    };
    const expectedResult = {
      ...initialState,
      bun: mockBun,
      currentIngredient: [
        { ...mockSauceIngredient, id: '3' },
        { ...mockMainIngredient, id: '2' }
      ]
    };
    const state = ingredientsSlice.reducer(
      initialStateWithIngredients,
      moveIngredientDown(0)
    );

    expect(state).toEqual(expectedResult);
  });
});
