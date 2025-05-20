import React, { useState, useEffect } from 'react';
import { backendUrl } from './localHostConf';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import OrdersList from './OrdersList';

function App() {
  const [orders, setOrders] = useState([]);

  const time = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Zagreb' }).replace(' ', 'T') + '.000Z';
  const date = new Date(time);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl}/orders/${year}/${month}/${day}`);
      const data = await response.json();

      if (data) {
        const ordersArray = Object.entries(data).map(([id, order]) => ({
          id,
          ...order
        }));

        setOrders(ordersArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      console.log('Fetching orders...');
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="my-4">
      <OrdersList orders={orders} />
    </Container>
  );
}

export default App;
