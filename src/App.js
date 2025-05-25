import { useState, useEffect } from 'react';
import { backendUrl } from './localHostConf';
import Container from 'react-bootstrap/Container';
import OrdersList from './components/OrdersList';

function App() {
  const [orders, setOrders] = useState([]);

  const time = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Zagreb' }).replace(' ', 'T') + '.000Z';
  const date = new Date(time);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');


  useEffect(() => {
    const fetchOrders = async () => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${backendUrl}/orders/${year}/${month}/${day}`);
          const data = await response.json();

          if (data) {
            const ordersArray = Object.entries(data)
            .filter(([id, order]) => order.status === 'accepted' || order.status === 'pending')  // <-- fix here
            .map(([id, order]) => ({
              id,
              ...order
            }));

            setOrders(ordersArray);
          }
        } catch (error) {
          console.log(error);
        }
      };

      await fetchData();
      console.log('Fetching orders...');
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [day, month, year]);

  return (
    <Container className="my-4">
      <OrdersList orders={orders} />
    </Container>
  );
}

export default App;
