import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;