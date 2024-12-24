import { ingredientsSlice, fetchIngredients } from './ingredients-slice';
import { TIngredient } from '@utils-types';

const initialState = {
  ingredientsData: [],
  ingredientsError: null,
  ingredientsRequest: false
};

const mockIngredientsData: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
  }
];

const mockError = 'Error';

describe('Тесты для ингридиентов', () => {
  test('Проверяет правильную обработку начала запроса', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsSlice.reducer(initialState, action);

    expect(result.ingredientsRequest).toBe(true);
    expect(result.ingredientsError).toBeNull();
  });

  test('Проверяет правильную обработку успешного выполнения запроса', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredientsData
    };
    const result = ingredientsSlice.reducer(initialState, action);

    expect(result.ingredientsData).toEqual(mockIngredientsData);
    expect(result.ingredientsRequest).toBe(false);
  });

  test('Проверяет правильную обработку ошибки запроса', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: mockError }
    };
    const result = ingredientsSlice.reducer(initialState, action);

    expect(result.ingredientsError).toBe(mockError);
    expect(result.ingredientsRequest).toBe(false);
  });
});
