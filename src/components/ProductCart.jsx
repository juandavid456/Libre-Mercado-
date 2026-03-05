
import { Card, Col, Button } from 'antd';
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
export default ProductCard;
