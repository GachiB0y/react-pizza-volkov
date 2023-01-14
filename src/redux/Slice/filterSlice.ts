import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}
export type TStort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: TStort;
}
const initialState: IFilterSliceState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryID(state, actions: PayloadAction<number>) {
      state.categoryId = actions.payload;
    },
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload;
    },
    onChangeSort(state, actions: PayloadAction<TStort>) {
      state.sort = actions.payload;
    },
    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
    },
    setFilters(state, actions: PayloadAction<IFilterSliceState>) {
      if (Object.keys(actions.payload).length) {
        state.currentPage = Number(actions.payload.currentPage);
        state.sort = actions.payload.sort;
        state.categoryId = Number(actions.payload.categoryId);
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const { setCategoryID, onChangeSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
