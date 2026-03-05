import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
}

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setProducts, setLoading, setError } = ProductSlice.actions;
export default ProductSlice.reducer