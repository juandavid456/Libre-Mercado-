import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setProducts, setLoading, setError } from '../Slice/productSlice';
import { toggleTheme } from '../Slice/themeSlice';
import {
  ConfigProvider,
  theme,
  Switch,
  FloatButton,
  Row,
  Typography,
  Spin,
  Alert
} from 'antd';
import { ShoppingCartOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useCart } from '../Slice/useCart';
import './App.css';
import ProductCard from './components/ProductCart';
import CartDrawer from './components/CartDrawer';
import Searcher from './components/searcher';
import { productService } from './services/productService';

const { Title } = Typography;

function App() {
  // --- Hooks y Estado ---
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { darkAlgorithm, defaultAlgorithm } = theme;

  // Selectores de Redux
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const { products, loading, error } = useSelector((state) => state.product);

  // Custom hook para la lógica del carrito
  const {
    cart,
    total,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  // --- Lógica de Filtrado ---
  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Efectos ---
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await productService.getAllProducts();
        dispatch(setProducts(data));
      } catch (err) {
        dispatch(setError("No se pudieron cargar los productos. Inténtalo más tarde."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  // --- Renderizado ---
  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <div style={{
        minHeight: '100vh',
        background: isDarkMode ? '#141414' : '#f0f2f5',
        color: isDarkMode ? '#fff' : '#000',
        transition: 'all 0.3s ease'
      }}>

        {/* Contenedor Principal */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '0 20px'
        }}>

          {/* Cabecera y Selector de Tema */}
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <Title level={2} style={{ margin: 0, color: 'inherit', marginBottom: 20 }}>
              Libre Mercado <ShoppingCartOutlined />
            </Title>

            {/* Componente Buscador */}
            <Searcher onSearch={setSearchTerm} />

            <div style={{ marginTop: 20 }}>
              <Switch
                checked={isDarkMode}
                onChange={() => dispatch(toggleTheme())}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
              <span style={{ marginLeft: 10 }}>Modo {isDarkMode ? 'Oscuro' : 'Claro'}</span>
            </div>
          </div>

          {/* Rejilla de Productos con Estados de Carga y Error */}
          <div style={{ paddingBottom: '50px', minHeight: '60vh' }}>
            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: 20, maxWidth: 600, margin: '0 auto 20px auto' }}
              />
            )}

            <Spin spinning={loading} size="large" description="Cargando productos...">
              <div style={{ minHeight: loading ? '400px' : 'auto' }}>
                <Row gutter={[20, 20]} justify="start">
                  {filteredProducts.map((prod) => (
                    <ProductCard key={prod.id} prod={prod} addToCart={addToCart} />
                  ))}
                </Row>
              </div>
            </Spin>
          </div>

        </div> {/* Cierra Contenedor Principal */}

        {/* Botón Flotante del Carrito */}
        <FloatButton
          icon={<ShoppingCartOutlined />}
          onClick={() => setIsDrawerOpen(true)}
          badge={{ count: cart.reduce((acc, item) => acc + item.quantity, 0) }}
          tooltip={<div>Ver carrito</div>}
        />

        {/* Drawer del Carrito */}
        <CartDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          cart={cart}
          total={total}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />

      </div>
    </ConfigProvider>
  );
}

export default App;
