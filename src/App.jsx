import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setProducts } from '../Slice/productSlice';
import {
  ConfigProvider,
  theme,
  Switch,
  FloatButton,
  Drawer,
  Col,
  Row,
  Card,
  Button,
  List,
  Typography,
  Space
} from 'antd';
import { ShoppingCartOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useCart } from '../Slice/useCart';
import './App.css';

const { Title } = Typography;

/**
 * Componente para mostrar un producto individual en una tarjeta.
 */
const ProductCard = ({ prod, addToCart }) => (
  <Col key={prod.id} xs={24} sm={12} md={8} lg={6}>
    <Card
      hoverable
      cover={
        <div style={{
          height: 200,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px 8px 0 0'
        }}>
          <img
            alt={prod.title}
            src={prod.image}
            style={{ height: '100%', width: '100%', objectFit: 'contain', padding: 15 }}
          />
        </div>
      }
      actions={[
        <Button type="primary" onClick={() => addToCart(prod)}>
          Agregar al carrito
        </Button>
      ]}
    >
      <Card.Meta
        title={<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.title}</div>}
        description={`$${prod.price}`}
      />
    </Card>
  </Col>
);

/**
 * Componente para el cajón lateral del carrito de compras.
 */
const CartDrawer = ({ open, onClose, cart, total, increaseQuantity, decreaseQuantity, removeFromCart }) => (
  <Drawer title="Tu Carrito" open={open} onClose={onClose} width={400}>
    <List
      dataSource={cart}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={
              <div>
                <p>${item.price} x {item.quantity}</p>
                <Space.Compact>
                  <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                  <Button disabled>{item.quantity}</Button>
                  <Button onClick={() => increaseQuantity(item.id)}>+</Button>
                </Space.Compact>
              </div>
            }
            avatar={
              <img
                alt={item.title}
                src={item.image}
                style={{ height: 50, width: 50, objectFit: 'contain' }}
              />
            }
          />
          <Button type="primary" danger onClick={() => removeFromCart(item.id)}>
            Eliminar
          </Button>
        </List.Item>
      )}
      footer={
        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '18px', marginTop: 20 }}>
          Total a pagar: ${total.toFixed(2)}
        </div>
      }
    />
  </Drawer>
);

function App() {
  // --- Hooks y Estado ---
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { darkAlgorithm, defaultAlgorithm } = theme;

  // Custom hook para la lógica del carrito
  const {
    cart,
    total,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  // Selector para obtener productos de Redux
  const products = useSelector((state) => state.product.products);

  // --- Efectos ---
  useEffect(() => {
    // Carga inicial de productos desde la API
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => dispatch(setProducts(data)));
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

        {/* Cabecera y Selector de Tema */}
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <Title level={2} style={{ margin: 0, color: 'inherit' }}>
            Libre Mercado <ShoppingCartOutlined />
          </Title>

          <div style={{ marginTop: 20 }}>
            <Switch
              checked={isDarkMode}
              onChange={(checked) => setIsDarkMode(checked)}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            <span style={{ marginLeft: 10 }}>Modo {isDarkMode ? 'Oscuro' : 'Claro'}</span>
          </div>
        </div>

        {/* Rejilla de Productos */}
        <div style={{ padding: '0 50px 50px 50px' }}>
          <Row gutter={[24, 24]} justify="center">
            {products.map((prod) => (
              <ProductCard key={prod.id} prod={prod} addToCart={addToCart} />
            ))}
          </Row>
        </div>

        {/* Botón Flotante del Carrito */}
        <FloatButton
          icon={<ShoppingCartOutlined />}
          onClick={() => setOpen(true)}
          badge={{ count: cart.reduce((acc, item) => acc + item.quantity, 0) }}
          tooltip={<div>Ver carrito</div>}
        />

        {/* Drawer del Carrito */}
        <CartDrawer
          open={open}
          onClose={() => setOpen(false)}
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
