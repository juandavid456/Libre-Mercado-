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
  Select,
  Alert
} from 'antd';
import { ShoppingCartOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useCart } from '../Slice/useCart';
import './App.css';
import ProductCard from './components/ProductCart';
import CartDrawer from './components/CartDrawer';
import Searcher from './components/searcher';
import { productService } from './services/productService';
import { useProductFilter } from '../Slice/FilterProduct';

const { Title } = Typography;

function App() {
  // --- Hooks y Estado ---
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const { filterByCategory } = useProductFilter();

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

        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);

      } catch (err) {
        dispatch(setError("Error al cargar datos."));
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

          {/* Cabecera / Navbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#e8e8e8'}`,
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <Title level={2} style={{ margin: 0, color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingCartOutlined /> Libre Mercado
            </Title>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexGrow: 1, justifyContent: 'flex-end' }}>
              {/* Componente Buscador */}
              <Searcher onSearch={setSearchTerm} />

              <Select
                placeholder="Categorías"
                style={{ width: 150 }}
                onChange={filterByCategory}
                options={categories.map(cat => ({ value: cat, label: cat }))}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch
                  size="small"
                  checked={isDarkMode}
                  onChange={() => dispatch(toggleTheme())}
                  checkedChildren={<MoonOutlined />}
                  unCheckedChildren={<SunOutlined />}
                />
                <span style={{ fontSize: '12px', opacity: 0.7 }}>{isDarkMode ? 'Oscuro' : 'Claro'}</span>
              </div>
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

        </div>
        {/* Cierra Contenedor Principal */}

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
