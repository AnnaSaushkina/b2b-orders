import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { scrollContainerStyle, spacerStyle, itemStyle } from './styles';
import type { ItemWithId, VirtualListProps } from './types';

export function VirtualList<T extends ItemWithId>({
  items,
  estimateItemHeight,
  overscan = 3,
  renderItem,
  onEndReached,
}: VirtualListProps<T>) {
  const DOMList = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => DOMList.current,
    estimateSize: (index) => estimateItemHeight,
   overscan,
  });
  const lastVisibleElement = virtualizer.getVirtualItems().at(-1)?.index;
  useEffect(() => {
    if (lastVisibleElement === items.length - 1) {
      onEndReached?.();
    }
  }, [lastVisibleElement, onEndReached, items.length]);
  return (
    <div ref={DOMList} style={scrollContainerStyle}>
      <div
        role="list"
        aria-rowcount={items.length}
        style={{
          ...spacerStyle,
          height: virtualizer.getTotalSize(),
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const product = items[virtualItem.index];
          if (product === undefined) return null;

          return (
            <div
              key={product.id}
              role="listitem"

              aria-posinset={virtualItem.index + 1}
              aria-setsize={items.length}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              style={{
                ...itemStyle,
                top: virtualItem.start,
              }}
            >
              {renderItem(product)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
