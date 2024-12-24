import { feedSlice, fetchFeeds } from './feed-slice';
import { TOrdersData } from '@utils-types';

const initialState = {
  feedData: { orders: [], total: 0, totalToday: 0 },
  feedError: null,
  feedRequest: false
};

const mockFeedData: TOrdersData = {
  orders: [
    {
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
    }
  ],
  total: 100,
  totalToday: 10
};

const mockError = 'Error';

describe('Тесты ленты заказов', () => {
  test('Проверяет правильную обработку начала запроса', () => {
    const action = { type: fetchFeeds.pending.type };
    const result = feedSlice.reducer(initialState, action);

    expect(result.feedRequest).toBe(true);
    expect(result.feedError).toBeNull();
  });

  test('Проверяет правильную обработку успешного выполнения запроса', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeedData };
    const result = feedSlice.reducer(initialState, action);

    expect(result.feedData).toEqual(mockFeedData);
    expect(result.feedRequest).toBe(false);
  });

  test('Проверяет правильную обработку ошибки запроса', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: mockError }
    };
    const result = feedSlice.reducer(initialState, action);

    expect(result.feedError).toBe(mockError);
    expect(result.feedRequest).toBe(false);
  });
});
