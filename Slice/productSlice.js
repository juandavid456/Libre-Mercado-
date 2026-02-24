import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
})

export const { setProducts } = ProductSlice.actions
export default ProductSlice.reducer