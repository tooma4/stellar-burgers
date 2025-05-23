import {
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  registerUserApi
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { TOrder, TUser } from '@utils-types';

type TUserState = {
  request: boolean;
  error: string | null;
  response: TUser | null;
  registerData: TRegisterData | null;
  userData: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  orders: TOrder[];
};

export const initialState: TUserState = {
  request: false,
  error: null,
  response: null,
  registerData: null,
  userData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  orders: []
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const getOrdersAll = createAsyncThunk('user/ordersUser', getOrdersApi);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        (state.request = true), (state.error = null);
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.request = false),
          (state.error = action.error.message as string),
          (state.isAuthChecked = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.request = false),
          (state.error = null),
          (state.response = action.payload.user);
        state.userData = action.payload.user;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        (state.request = true), (state.error = null);
      })
      .addCase(updateUser.rejected, (state, action) => {
        (state.request = false), (state.error = action.error.message as string);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        (state.request = false),
          (state.error = null),
          (state.response = action.payload.user);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
        state.request = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.error = null;
        state.request = false;
        state.userData = null;
      })
      .addCase(getOrdersAll.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.orders = action.payload;
      });
  }
});

export const { getUserState, getError } = userSlice.selectors;
export default userSlice.reducer;
