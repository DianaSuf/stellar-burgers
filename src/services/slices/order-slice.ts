import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);
export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  orderBurgerApi
);
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

interface TOrderState {
  ordersData: TOrder[];
  orderModalData: TOrder | null;
  orderError: string | null | undefined;
  orderRequest: boolean;
}

const initialState: TOrderState = {
  ordersData: [],
  orderModalData: null,
  orderError: null,
  orderRequest: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrdersData: (store) => store.ordersData,
    getOrderModalData: (store) => store.orderModalData,
    getOrderError: (store) => store.orderError,
    getOrderRequest: (store) => store.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersData = action.payload;
        state.orderRequest = false;
      });
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.ordersData.push(action.payload.order);
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      });
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
        state.orderRequest = false;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const {
  getOrdersData,
  getOrderModalData,
  getOrderError,
  getOrderRequest
} = orderSlice.selectors;
