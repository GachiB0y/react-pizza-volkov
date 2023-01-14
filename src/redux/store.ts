import { configureStore } from '@reduxjs/toolkit';
import filter from './Slice/filterSlice';
import cart from './Slice/cartSlice';
import pizza from './Slice/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
