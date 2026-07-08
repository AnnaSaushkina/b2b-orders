import { type ReactNode, useState } from 'react';

export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => ReactNode;
  onEndReached?: () => void;
}

export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  onEndReached,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const OVERSCAN = 3;

  function calcWindow(scrollTop: number) {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - OVERSCAN);
    const visibleCount = Math.ceil(height / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + OVERSCAN, items.length);
    return { startIndex, endIndex };
  }
  const { startIndex, endIndex } = calcWindow(scrollTop);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      onScroll={(e) => {
        const newScrollTop = e.currentTarget.scrollTop;
        setScrollTop(newScrollTop);
        const { endIndex } = calcWindow(newScrollTop);

        if (items.length > 0 && endIndex >= items.length) onEndReached?.();
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
