import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  registerUserApi,
  loginUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  userError: string | null | undefined;
  userRequest: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  userError: null,
  userRequest: false
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthChecked: (store) => store.isAuthChecked,
    getIsAuthenticated: (store) => store.isAuthenticated,
    getUserData: (store) => store.userData,
    getUserName: (store) => store.userData?.name,
    getUserError: (store) => store.userError,
    getUserRequest: (store) => store.userRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userRequest = false;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userRequest = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userRequest = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userRequest = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userRequest = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const {
  getIsAuthChecked,
  getIsAuthenticated,
  getUserData,
  getUserName,
  getUserError,
  getUserRequest
} = userSlice.selectors;
