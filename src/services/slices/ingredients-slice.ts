import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientType } from '../../const';

interface TIngredientsState {
  ingredientsData: Array<TIngredient>;
  ingredientsError: string | null | undefined;
  ingredientsRequest: boolean;
}

const initialState: TIngredientsState = {
  ingredientsData: [],
  ingredientsError: null,
  ingredientsRequest: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredient/fetchIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsData: (store) => store.ingredientsData,
    getIngredientById: (store) => (id: string) =>
      store.ingredientsData.find((ingredient) => ingredient._id === id),
    getBunIngredientsData: (store) =>
      store.ingredientsData.filter(
        (ingredient) => ingredient.type === IngredientType.BUN
      ),
    getMainIngredientsData: (store) =>
      store.ingredientsData.filter(
        (ingredient) => ingredient.type === IngredientType.MAIN
      ),
    getSauceIngredientsData: (store) =>
      store.ingredientsData.filter(
        (ingredient) => ingredient.type === IngredientType.SAUCE
      ),
    getIngredientsError: (store) => store.ingredientsError,
    getIngredientsRequest: (store) => store.ingredientsRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsError = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.ingredientsRequest = false;
      });
  }
});

export const {
  getIngredientsData,
  getIngredientById,
  getBunIngredientsData,
  getMainIngredientsData,
  getSauceIngredientsData,
  getIngredientsError,
  getIngredientsRequest
} = ingredientsSlice.selectors;
