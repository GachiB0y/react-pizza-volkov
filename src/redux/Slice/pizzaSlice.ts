import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { TStort } from './filterSlice';

type TPizza = {
  id: string;
  title: string;
  types: number[];
  price: number;
  count: number;
  imageUrl: string;
  sizes: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}

export type TFetchPizzasArgs = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: TFetchPizzasArgs) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<TPizza[]>(
      `https://630cfcacb37c364eb7fe20c3.mockapi.io/pizzas_items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data as TPizza[];
  },
);

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setitems(state, actions: PayloadAction<TPizza[]>) {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});
export const selectPizzaData = (state: RootState) => state.pizza;
export const { setitems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
