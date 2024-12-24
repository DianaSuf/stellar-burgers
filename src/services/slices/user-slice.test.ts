import {
  userSlice,
  getUser,
  updateUser,
  registerUser,
  loginUser,
  logoutUser
} from './user-slice';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  userError: null,
  userRequest: false
};

const mockUserData: TUser = {
  name: 'Test User',
  email: 'testuser@example.com'
};

const mockError = 'Error';

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('Тесты для пользователя', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Проверяет правильную инициализацию userSlice', () => {
    const newState = userSlice.reducer(undefined, { type: '' });
    expect(newState).toEqual(initialState);
  });

  describe('Тесты для обработки состояний асинхронных действий пользователя', () => {
    describe('Тесты для запроса getUser', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: getUser.pending.type };
        const result = userSlice.reducer(initialState, action);

        expect(result.userRequest).toBe(true);
        expect(result.userError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: getUser.fulfilled.type,
          payload: { user: mockUserData }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userData).toEqual(mockUserData);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(true);
        expect(result.userRequest).toBe(false);
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: getUser.rejected.type,
          error: { message: mockError }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userError).toBe(mockError);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(false);
        expect(result.userRequest).toBe(false);
      });
    });

    describe('Тесты для запроса updateUser', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: updateUser.pending.type };
        const result = userSlice.reducer(initialState, action);

        expect(result.userRequest).toBe(true);
        expect(result.userError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: updateUser.fulfilled.type,
          payload: { user: mockUserData }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userData).toEqual(mockUserData);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(true);
        expect(result.userRequest).toBe(false);
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: updateUser.rejected.type,
          error: { message: mockError }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userError).toBe(mockError);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(false);
        expect(result.userRequest).toBe(false);
      });
    });

    describe('Тесты для запроса registerUser', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: registerUser.pending.type };
        const result = userSlice.reducer(initialState, action);

        expect(result.userRequest).toBe(true);
        expect(result.userError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: registerUser.fulfilled.type,
          payload: {
            user: mockUserData,
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken'
          }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userData).toEqual(mockUserData);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(true);
        expect(result.userRequest).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'refreshToken',
          'mockRefreshToken'
        );
        expect(setCookie).toHaveBeenCalledWith(
          'accessToken',
          'mockAccessToken'
        );
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: registerUser.rejected.type,
          error: { message: mockError }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userError).toBe(mockError);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(false);
        expect(result.userRequest).toBe(false);
      });
    });

    describe('Тесты для запроса loginUser', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: loginUser.pending.type };
        const result = userSlice.reducer(initialState, action);

        expect(result.userRequest).toBe(true);
        expect(result.userError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = {
          type: loginUser.fulfilled.type,
          payload: {
            user: mockUserData,
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken'
          }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userData).toEqual(mockUserData);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(true);
        expect(result.userRequest).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'refreshToken',
          'mockRefreshToken'
        );
        expect(setCookie).toHaveBeenCalledWith(
          'accessToken',
          'mockAccessToken'
        );
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: loginUser.rejected.type,
          error: { message: mockError }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userError).toBe(mockError);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(false);
        expect(result.userRequest).toBe(false);
      });
    });

    describe('Тесты для запроса logoutUser', () => {
      test('Проверяет правильную обработку начала запроса', () => {
        const action = { type: logoutUser.pending.type };
        const result = userSlice.reducer(initialState, action);

        expect(result.userRequest).toBe(true);
        expect(result.userError).toBeNull();
      });

      test('Проверяет правильную обработку успешного выполнения запроса', () => {
        const action = { type: logoutUser.fulfilled.type };
        const result = userSlice.reducer(initialState, action);

        expect(result.userData).toBeNull();
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(false);
        expect(result.userRequest).toBe(false);
        expect(deleteCookie).toHaveBeenCalledWith('accessToken');
        expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
      });

      test('Проверяет правильную обработку ошибки запроса', () => {
        const action = {
          type: logoutUser.rejected.type,
          error: { message: mockError }
        };
        const result = userSlice.reducer(initialState, action);

        expect(result.userError).toBe(mockError);
        expect(result.isAuthChecked).toBe(true);
        expect(result.isAuthenticated).toBe(false);
        expect(result.userRequest).toBe(false);
      });
    });
  });
});
