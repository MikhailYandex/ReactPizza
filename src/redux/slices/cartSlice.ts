import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CartItem = {
	id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
	count: number;
}

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action:PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    minusItem(state, action:PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
