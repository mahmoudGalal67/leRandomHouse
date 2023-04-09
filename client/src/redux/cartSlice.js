import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
    deleteCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    fetchFinish: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetCart:(state,action)=>{
      state.cart=[]
    }
  },
});

export const { fetchFailure, fetchStart, setCart, fetchFinish, deleteCart,resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
