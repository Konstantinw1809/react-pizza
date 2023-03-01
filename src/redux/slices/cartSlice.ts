import { getCartFromLS } from "./../../utils/getCartFromLS";
import { createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice -= action.payload.price * action.payload.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
  },
});

// @ts-ignore
export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
