import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import type { VirtualListProps, ItemWithId } from './types';
import { scrollContainerStyle, visibleWindowStyle } from './styles';
import { productCardStyle } from '@/pages/products-list/product-card-style';

export function VirtualList<T extends ItemWithId>({
  items,
  height,
  renderItem,
  onEndReached,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const OVERSCAN = 3;

  function calcWindow(scrollTop: number) {
    const startIndex = Math.max(0, Math.floor(scrollTop / height.item) - OVERSCAN);
    const visibleCount = Math.ceil(height.list / height.item);
    const endIndex = Math.min(startIndex + visibleCount + OVERSCAN, items.length);
    return { startIndex, endIndex };
  }
  const { startIndex, endIndex } = calcWindow(scrollTop);

  const DOMlist = useRef(new Map());
  // useLayoutEffect(() => console.log('DOMlist.current: ', DOMlist.current));

  // const scrollWindowHeight = Array.from(DOMlist.current.values());

  // console.log('дом элементы: ' + scrollWindowHeight);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [scrollTop, height.item, height.list, items]);

  function setScrollPosition(e: React.UIEvent<HTMLDivElement>) {
    const newScrollTop = e.currentTarget.scrollTop;

    setScrollTop(newScrollTop);
    const { endIndex } = calcWindow(newScrollTop);

    if (items.length > 0 && endIndex >= items.length) onEndReached?.();
  }

  return (
    <div
      onScroll={(e) => {
        setScrollPosition(e);
      }}
      style={{ ...scrollContainerStyle, height: height.list }}
    >
      <div
        style={{
          height: items.length * height.item,
        }}
      >
        <div
          style={{
            top: startIndex * height.item,
            position: 'absolute',
          }}
        >
          {visibleItems.map((item) => {
            return (
              <div
                style={productCardStyle}
                key={item.id}
                ref={(node) => {
                  if (node !== null) {
                    DOMlist.current.set(item.id, node.offsetHeight);
                  }
                }}
              >
                {renderItem(item)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
