import { OrdersTable } from '@/widgets/orders-table';
import { mockOrders } from '@/shared/lib/mock-orders';

export function Page() {
  return <OrdersTable orders={mockOrders} />;
}
