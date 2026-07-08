import type { Order } from '@/entities/order/model/types';
export const mockOrders: Order[] = [
  {
    id: 1,
    status: 'created',
    distributorId: 101,
    totalAmount: 125000,
    createdAt: '05.07',
    items: [1, 2],
  },
  {
    id: 2,
    status: 'paid',
    distributorId: 102,
    totalAmount: 87500,
    createdAt: '03.07',
    items: [3, 4, 5],
  },
  {
    id: 3,
    status: 'sent',
    distributorId: 101,
    totalAmount: 234000,
    createdAt: '01.07',
    items: [6],
  },
];
