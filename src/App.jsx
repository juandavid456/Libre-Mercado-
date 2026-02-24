
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../Slice/cartSlice'
import { useEffect, useState } from 'react'
import { setProducts } from '../Slice/productSlice'
import { FloatButton, Drawer } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './App.css'

function App() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)
  console.log(cart)

  const products = useSelector((state) => state.product.products)
  console.log(products)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data =>
        dispatch(setProducts(data)))
  }, [dispatch])

  return (
    <>
      <h1>Libre Mercado 🛒</h1>
      <div className="product-list">
        {products.map((prod) => (
          <div key={prod.id} className="card">
            <img src={prod.image} alt={prod.title} style={{ width: '50px' }} />
            <p>{prod.title}</p>
            <button onClick={() => dispatch(addItem(prod))}>
              Agregar al carrito
            </button>
          </div>
        ))}
        <FloatButton
          icon={<ShoppingCartOutlined />}
          onClick={() => setOpen(true)}
          badge={{ count: cart.length }}
        />
        <Drawer title="Tu Carrito" open={open} onClose={() => setOpen(false)}>
          <p>Aquí verás tus productos...</p>
        </Drawer>
      </div>
    </>
  )
}

export default App
