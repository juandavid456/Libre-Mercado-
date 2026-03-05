import { Drawer, List, Button, Space } from 'antd';
/**
 * Componente para el cajón lateral del carrito de compras.
 */

const CartDrawer = ({ open, onClose, cart, total, increaseQuantity, decreaseQuantity, removeFromCart }) => (
    <Drawer title="Tu Carrito" open={open} onClose={onClose} size={400}>
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
export default CartDrawer;
