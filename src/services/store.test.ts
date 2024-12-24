import store, { rootReducer } from './store';

describe('Тесты корневого редюсера', () => {
  test('Проверяет правильную инициализацию rootReducer', () => {
    const initialState = store.getState();
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(newState).toEqual(initialState);
  });
});
