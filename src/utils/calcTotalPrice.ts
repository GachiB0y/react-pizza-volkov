import { TCartItem } from '../redux/Slice/cartSlice';

export const calcTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
