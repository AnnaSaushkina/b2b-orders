import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

export type Height = { item: number; list: number };

export type ItemWithId = { id: string | number };

export type VirtualListProps<T extends ItemWithId> = {
  items: T[];
  height: Height;
  renderItem: (item: T) => ReactNode;
  onEndReached?: () => void;
};

/** Скролл-контейнер. Высота приходит пропом — задаётся ниже в разметке. */
const scrollContainerStyle: CSSProperties = {
  overflow: 'auto',
  position: 'relative',
};

/**
 * Распорка: держит полную высоту списка, чтобы полоса прокрутки была честной.
 * position: relative — точка отсчёта для absolute у элементов.
 */
const spacerStyle: CSSProperties = {
  position: 'relative',
};

/** Элемент списка. top приходит из virtualItem.start. */
const itemStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  width: '100%',
};

export function VirtualList<T extends ItemWithId>({
  items,
  height,
  renderItem,
  onEndReached,
}: VirtualListProps<T>) {
  const DOMList = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => DOMList.current,
    estimateSize: (index) => height.item,
    overscan: 3,
  });
  const lastVisibleElement = virtualizer.getVirtualItems().at(-1)?.index;
  useEffect(() => {
    if (lastVisibleElement === items.length - 1) {
      onEndReached?.();
    }
  }, [lastVisibleElement]);
  return (
    <div
      ref={DOMList}
      style={{
        ...scrollContainerStyle,
        height: height.list,
      }}
    >
      <div
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
