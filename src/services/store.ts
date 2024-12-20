import { combineReducers, configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import constructorSlice from './slices/constructorSlice/constructorSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import userSlice from './slices/userSlice/userSlice';
import ingredientSlice from './slices/ingredientSlice/ingredientSlice';
=======
import { ingredientSlice } from './slices/ingredients/ingredientsSlice';
>>>>>>> 525f76303a7afb5efb513020cccef40536cc9d58

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

<<<<<<< HEAD
const rootReducer = combineReducers({
  ingredient: ingredientSlice,
  order: orderSlice,
  constructorBurger: constructorSlice,
  feed: feedSlice,
  user: userSlice
=======
export const rootReducer = combineReducers({
  ingredient: ingredientSlice
>>>>>>> 525f76303a7afb5efb513020cccef40536cc9d58
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
<<<<<<< HEAD

=======
>>>>>>> 525f76303a7afb5efb513020cccef40536cc9d58
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
