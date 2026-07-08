import { VirtualList } from '@/shared/ui/virtual-list';
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/entities/product/api';
import type { Product } from '@/entities/product/model/types';

export function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function loadMore() {
    if (isLoading) return;
    setOffset((prev) => prev + 200);
  }

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const newProducts = await fetchProducts(200, offset);
        setProducts((prev) => [...prev, ...newProducts]);
      } catch (err) {
        console.error('не загружены айтемы');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [offset]);

  return (
    // обычный рендер
    // 50 000 DOM-узлов
    // <div style={{ height: 500, overflow: 'auto' }}>
    //   {products.map((item) => (
    //     <div key={item.id} style={{ height: 50 }}>
    //       {item.name}
    //     </div>
    //   ))}
    // </div>

    // виртуализация
    <VirtualList<Product>
      items={products}
      itemHeight={50}
      height={500}
      onEndReached={loadMore}
      renderItem={(item) => (
        <div key={item.id} style={{ height: 50 }}>
          {item.name}
        </div>
      )}
    />
  );
}
