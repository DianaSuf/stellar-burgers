import {
  orderSlice,
  clearOrder,
  getOrders,
  orderBurger,
  getOrderByNumber
} from './order-slice';
import { TOrder } from '@utils-types';

const initialState = {
  ordersData: [],
  orderModalData: null,
  orderError: null,
  orderRequest: false
};

const mockOrderData: TOrder = {
  _id: '6769fdd7750864001d373e8f',
  status: 'done',
  name: 'Краторный spicy био-марсианский бургер',
  createdAt: '2024-12-24T00:18:31.399Z',
  updatedAt: '2024-12-24T00:18:32.344Z',
  number: 63949,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942'
  ]
};

const mockOrdersData: TOrder[] = [mockOrderData];

const mockError = 'Error';

describe('Тесты для заказов', () => {
  test('Проверяет правильную инициализацию orderSlice', () => {
    const newState = orderSlice.reducer(undefined, { type: '' });
    expect(newState).toEqual(initialState);
  });

  test('Проверяет правильную очистку данных заказа', () => {
    const state = {
      ...initialState,
      orderModalData: mockOrderData
    };
    expect(orderSlice.reducer(state, clearOrder())).toEqual({
      ...state,
      orderModalData: null
    });
  });

  describe('Тесты для для обработки состояний асинхронных действий заказов', () => {
    describe('Тесты для запроса getOrders', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: getOrders.pending.type };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderRequest).toBe(true);
        expect(result.orderError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: getOrders.fulfilled.type,
          payload: mockOrdersData
        };
        const result = orderSlice.reducer(initialState, action);

        expect(result.ordersData).toEqual(mockOrdersData);
        expect(result.orderRequest).toBe(false);
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: getOrders.rejected.type,
          error: { message: mockError }
        };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderError).toBe(mockError);
        expect(result.orderRequest).toBe(false);
      });
    });

    describe('Тесты для запроса orderBurger', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: orderBurger.pending.type };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderRequest).toBe(true);
        expect(result.orderError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: orderBurger.fulfilled.type,
          payload: { order: mockOrderData }
        };
        const result = orderSlice.reducer(initialState, action);

        expect(result.ordersData).toContainEqual(mockOrderData);
        expect(result.orderModalData).toEqual(mockOrderData);
        expect(result.orderRequest).toBe(false);
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: orderBurger.rejected.type,
          error: { message: mockError }
        };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderError).toBe(mockError);
        expect(result.orderRequest).toBe(false);
      });
    });

    describe('Тесты для запроса getOrderByNumber', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: getOrderByNumber.pending.type };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderRequest).toBe(true);
        expect(result.orderError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: getOrderByNumber.fulfilled.type,
          payload: { orders: [mockOrderData] }
        };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderModalData).toEqual(mockOrderData);
        expect(result.orderRequest).toBe(false);
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: getOrderByNumber.rejected.type,
          error: { message: mockError }
        };
        const result = orderSlice.reducer(initialState, action);

        expect(result.orderError).toBe(mockError);
        expect(result.orderRequest).toBe(false);
      });
    });
  });
});
