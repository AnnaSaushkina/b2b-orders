export type Order = {
  id: number;
  status: 'created' | 'paid' | 'sent' | 'received';
  createdAt: string;
  distributorId: number;
  totalAmount: number;
  items: number[];
};
