// Страница Общая таблица товаров
import { VirtualList } from '@/shared/ui/virtual-list';
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/entities/product/api';
import type { Product } from '@/entities/product/model/types';

export function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function load() {
      const data = await fetchProducts(50000, 0);
      setProducts(data);
    }
    load();
  }, []);

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
    <VirtualList
      items={products}
      itemHeight={50}
      height={500}
      renderItem={(item) => (
        <div key={item.id} style={{ height: 50 }}>
          {item.name}
        </div>
      )}
    />
  );
}
