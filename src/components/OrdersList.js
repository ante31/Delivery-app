import { useState } from 'react';
import OrderCard from './OrderCard';

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
    {orders
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .map((order, index, arr) => {
        const reverseIndex = arr.length - 1 - index;

        return (!order.isDelivery || order.status === 'pending') ? null : (
          <OrderCard
            key={reverseIndex}
            order={order}
            index={reverseIndex}
            openIndexes={openIndexes}
            toggleCollapse={toggleCollapse}
          />
        );
      })}
  </div>
);

}


export default OrdersList;
