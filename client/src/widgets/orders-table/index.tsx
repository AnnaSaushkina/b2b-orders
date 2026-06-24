import type { Order } from '@/entities/order/model/types';

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p>Заказов нет</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Статус</td>
          <td>Дистрибьютор</td>
          <td>Итого</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.status}</td>
            <td>{order.distributorId}</td>
            <td>{order.totalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
