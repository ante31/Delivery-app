import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import getCleanPrice from './services/getCleanPrice';

function OrdersList({ orders }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleCollapse = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  console.log(orders);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      {orders.sort((a, b) => new Date(b.time) - new Date(a.time)).map((order, index) => (

      !order.isDelivery ? null : (

        <Card key={order.id} className="mb-3 shadow-sm" style={{ borderRadius: '12px' }}>
          <Card.Body>
            {/* Gornji red: index i cijena s Collapse toggle-om */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Badge
                bg="danger"
                pill
                style={{
                  fontSize: '0.9rem',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                }}
              >
                {index + 1}
              </Badge>

              <Button
                variant="primary"
                size="sm"
                onClick={() => toggleCollapse(index)}
                aria-expanded={openIndexes.includes(index)}
              >
                {order.totalPrice.toFixed(2)} €
              </Button>
            </div>

            <Collapse in={openIndexes.includes(index)}>
              <div>
                <div
                  className="p-2 mb-2"
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                >
                  {order.cartItems.map((item, i) => (
                    <div key={i} >
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontSize: '0.95rem', color: '#333' }}
                      >
                        <span>{item.quantity} x {item.name.split('|')[0]}</span>
                        <span>{getCleanPrice(item).toFixed(2)} €</span>
                      </div>

                      {/* Provjera za selectedExtras */}
                      {item.selectedExtras && typeof item.selectedExtras === 'object' && (
                        <div style={{ paddingLeft: '1rem', marginTop: '2px' }}>
                          {Object.entries(item.selectedExtras).map(([extraName, extraPrice], j) => (
                            <div
                              key={j}
                              className="d-flex justify-content-between"
                              style={{ fontSize: '0.85rem', color: '#666' }}
                            >
                              <span>+ {extraName.split('|')[0]}</span>
                              <span>{(extraPrice*item.quantity).toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div >
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontSize: '0.95rem', color: '#333' }}
                      >
                        <span>Dostava</span>
                        <span>1.50 €</span>
                      </div>
                    </div>
                </div>
              </div>
            </Collapse>

            <Card.Title style={{ fontWeight: '600', fontSize: '1.25rem', color: '#2c3e50' }}>
              {order.name}
            </Card.Title>

            <Card.Text style={{ color: '#555', fontSize: '1rem', marginBottom: '0.25rem' }}>
              📍{' '}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  order.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#555', textDecoration: 'none', fontWeight: '500' }}
              >
                {order.address}, {order.zone}
              </a>
            </Card.Text>

            <Card.Text style={{ color: '#555', fontSize: '1rem' }}>
              📞{' '}
              <a
                href={`tel:${order.phone}`}
                style={{ color: '#555', textDecoration: 'none', fontWeight: '500' }}
              >
                {order.phone}
              </a>
            </Card.Text>
          </Card.Body>
        </Card>)
      ))}
    </div>
  );
}


export default OrdersList;
