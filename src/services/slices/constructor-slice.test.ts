import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructor-slice';
import { TConstructorIngredient } from '@utils-types';

const initialState = {
  bun: null,
  ingredients: []
};

const bunMock: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa093c',
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
};

const mainMock: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa0941',
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
};

const sauceMock: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa0942',
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
};

const stateBurgerMock = {
  bun: bunMock,
  ingredients: [mainMock, sauceMock]
};

describe('Тесты конструктора бургера', () => {
  test('Проверяет правильную инициализацию constructorSlice', () => {
    const newState = constructorSlice.reducer(undefined, { type: '' });
    expect(newState).toEqual(initialState);
  });

  test('Проверяет правильное добавление булки', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(bunMock)
    );
    expect(newState).toEqual({
      bun: bunMock,
      ingredients: []
    });
  });

  test('Проверяет правильное добавление ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(mainMock)
    );
    expect(newState.ingredients).toContainEqual(mainMock);
  });

  test('Проверяет правильное удаление ингридиента', () => {
    const newState = constructorSlice.reducer(
      stateBurgerMock,
      removeIngredient(mainMock)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients).not.toContainEqual(mainMock);
  });

  test('Проверяет правильное изменение порядка ингредиентов в начинке', () => {
    const newState = constructorSlice.reducer(
      stateBurgerMock,
      moveIngredient({ index: 1, direction: 'up' })
    );
    expect(newState.ingredients[0].id).toBe(sauceMock._id);
  });

  test('Проверяет правильную очистку конструктора', () => {
    const newState = constructorSlice.reducer(
      stateBurgerMock,
      clearConstructor()
    );
    expect(newState).toEqual(initialState);
  });
});
