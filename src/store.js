import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Slice/cartSlice';
import productReducer from '../Slice/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer
  },
});