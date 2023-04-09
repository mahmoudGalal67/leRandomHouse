import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
    deleteWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    favourite: (state, action) => {
      let isFavourite = state.wishlist.some(
        (item) => item.id === action.payload.id
      );
      if (isFavourite) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.wishlist.push(action.payload);
      }
    },
    fetchFinish: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchFailure,
  fetchStart,
  setWishlist,
  fetchFinish,
  deleteWishlist,
  favourite,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
