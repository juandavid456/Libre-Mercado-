const BASE_URL = 'https://dummyjson.com';

/*
Servicio para manejar todas las peticiones relacionadas con productos.
*/
export const productService = {
  // Obtener todos los productos
  getAllProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=50`);
      const data = await response.json();
      if (!response.ok) throw new Error('Error al cargar productos');
      return data.products;

    } catch (error) {
      console.error("Error en productService:", error);
      throw error;
    }
  },
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/category-list`);
    return await response.json(); 
  },

    getProductsByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data.products;
  }
};
