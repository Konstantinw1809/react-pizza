import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  activeCategory: 0,
  currentPage: 1,
  sortType: {
    name: "популярности (desc)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

// @ts-ignore
export const selectFilter = (state) => state.filter;
// @ts-ignore
export const selectSort = (state) => state.filter.sortType;

export const {
  setActiveCategory,
  setSortType,
  setCurrentPage,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
