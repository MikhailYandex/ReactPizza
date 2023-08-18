import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Sort = {
  name: string;
  sortProperty: string;
};

interface FilterSliceState {
  categoryId: number;
  pageCount: number;
  searchValue: string;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  pageCount: 1,
  searchValue: "",
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
