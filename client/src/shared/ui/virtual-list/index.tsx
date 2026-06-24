import { type ReactNode, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  characteristics: string[];
}

export interface VirtualListProps {
  items: Product[];
  itemHeight: number;
  height: number;
  renderItem: (item: Product, index: number) => ReactNode;
}

export function VirtualList({ items, itemHeight, height, renderItem }: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
  const visibleCount = Math.ceil(height / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 3, items.length);

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
      }}
      style={{
        height: height,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: items.length * itemHeight,
        }}
      >
        <div style={{ position: 'absolute', top: startIndex * itemHeight, width: '100%' }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  );
}
