import type { ReactNode } from 'react';

export type ItemWithId = { id: string | number };

export type VirtualListProps<T extends ItemWithId> = {
  items: T[];
  overscan?: number;
  estimateItemHeight: number;
  renderItem: (item: T) => ReactNode;
  onEndReached?: () => void;
};
