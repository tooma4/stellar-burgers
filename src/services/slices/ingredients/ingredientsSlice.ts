import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  }
});

export const selectIngredients = (state: { ingredients: TIngredientState }) =>
  state.ingredients.ingredients;

export const reducer = ingredientSlice.reducer;
