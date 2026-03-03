import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, incrementQuantity, decrementQuantity } from "../Slice/cartSlice";

export const useCart = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);


    const total = cart.reduce((acumulador, producto) => {
        return acumulador + Number(producto.price) * producto.quantity;
    }, 0);


    const addToCart = (product) => dispatch(addItem(product));
    const removeFromCart = (id) => dispatch(removeItem(id));
    const increaseQuantity = (id) => dispatch(incrementQuantity(id));
    const decreaseQuantity = (id) => dispatch(decrementQuantity(id));


    return {
        cart,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    };
};