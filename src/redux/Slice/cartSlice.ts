import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, actions: PayloadAction<TCartItem>) {
      const finditem = state.items.find((obj) => obj.id === actions.payload.id);
      if (finditem) {
        finditem.count++;
      } else {
        state.items.push({ ...actions.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, actions: PayloadAction<string>) {
      const finditem = state.items.find((obj) => obj.id === actions.payload);
      if (finditem && finditem.count > 0) {
        finditem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, actions: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== actions.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemsById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const { addItems, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
