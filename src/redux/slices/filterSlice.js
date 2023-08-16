import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
	pageCount: 1,
	searchValue: '',
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
		setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
		setSort(state, action) {
      state.sort = action.payload;
    },
		setPageCount(state, action) {
      state.pageCount = action.payload;
    },
		setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
