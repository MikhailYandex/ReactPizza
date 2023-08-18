import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  isLoading: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  isLoading: Status.LOADING,
};

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizza",
  async (params) => {
    const { sortBy, category, order, search, pageCount } = params;
    const res = await axios.get<Pizza[]>(
      `https://64d72bc82a017531bc13046a.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.isLoading = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = Status.SUCCESS;
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.isLoading = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
