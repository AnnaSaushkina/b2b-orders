import type { ReactNode } from 'react';

export type Height = { item: number; list: number };

export type ItemWithId = { id: string | number };

export type VirtualListProps<T extends ItemWithId> = {
  items: T[];
  height: Height;
  renderItem: (item: T) => ReactNode;
  onEndReached?: () => void;
};
