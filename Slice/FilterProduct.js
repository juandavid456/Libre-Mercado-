import { useDispatch } from 'react-redux';
import { setLoading, setProducts, setError } from './productSlice';
import { productService } from '../src/services/productService';

export const useProductFilter = () => {

    const dispatch = useDispatch();
    const filterByCategory = async (category) => {
        dispatch(setLoading(true));
        try {
            const data = await productService.getProductsByCategory(category);
            dispatch(setProducts(data));
        }
        catch (error) {
            dispatch(setError(error));
        }
        finally {
            dispatch(setLoading(false));
        }


    }

    return { filterByCategory };
};
