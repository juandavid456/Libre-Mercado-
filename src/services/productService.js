const BASE_URL = 'https://fakestoreapi.com';

/**
 * Servicio para manejar todas las peticiones relacionadas con productos.
 */
export const productService = {
  // Obtener todos los productos
  getAllProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) throw new Error('Error al cargar productos');
      return await response.json();
    } catch (error) {
      console.error("Error en productService:", error);
      throw error;
    }
  },


};