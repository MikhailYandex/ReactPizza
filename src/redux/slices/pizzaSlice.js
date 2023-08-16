import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizza = createAsyncThunk("pizza/fetchPizza", async (params) => {
	const { sortBy, category, order, search, pageCount } = params;
	const res = await axios.get(
		`https://64d72bc82a017531bc13046a.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
	);
	return res.data;
});

const initialState = {
  items: [],
	isLoading: 'loading',
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
	extraReducers: {
		[fetchPizza.pending]: (state) => {
			state.isLoading = 'loading';
			state.items = [];
		},
		[fetchPizza.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.isLoading = 'success';
		},
		[fetchPizza.rejected]: (state, action) => {
			state.isLoading = 'error';
			state.items = [];
		},
	}
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
