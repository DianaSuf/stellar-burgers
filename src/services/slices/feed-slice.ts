import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '@utils-types';

interface TFeedState {
  feedData: TOrdersData;
  feedError: string | null | undefined;
  feedRequest: boolean;
}

const initialState: TFeedState = {
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  feedError: null,
  feedRequest: false
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedData: (store) => store.feedData,
    getFeedOrdersData: (store) => store.feedData.orders,
    getFeedTotalData: (store) => store.feedData.total,
    getFeedTotalTodayData: (store) => store.feedData.totalToday,
    getFeedError: (store) => store.feedError,
    getFeedRequest: (store) => store.feedRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.feedRequest = true;
        state.feedError = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.feedRequest = false;
        state.feedError = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedData = action.payload;
        state.feedRequest = false;
      });
  }
});

export const {
  getFeedData,
  getFeedOrdersData,
  getFeedTotalData,
  getFeedTotalTodayData,
  getFeedError,
  getFeedRequest
} = feedSlice.selectors;
