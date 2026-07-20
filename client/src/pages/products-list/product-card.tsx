import type { CSSProperties } from 'react';
import type { Product } from '@/entities/product/model/types';

const titleStyle: CSSProperties = { fontWeight: 600, fontSize: 16, marginBottom: 4 };
const metaStyle: CSSProperties = { color: '#666', fontSize: 13, marginBottom: 6 };
const priceStyle: CSSProperties = { fontWeight: 600, marginBottom: 6 };
const charRowStyle: CSSProperties = {
  padding: '8px 10px',
  marginTop: 6,
  background: '#f4f4f5',
  borderRadius: 6,
  fontSize: 13,
  color: '#333',
};

// Презентационная карточка для демо: высота зависит от числа характеристик (1–6),
// каждая характеристика — «жирный» блок, поэтому карточки сильно разной высоты —
// на этом наглядно ломается фиксированная виртуализация.
// Коробку (padding/border) даёт обёртка VirtualList, здесь — только внутренние поля.
// Цена выводится сырым числом (без форматирования — это финансовая логика, красная зона).
export function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div style={titleStyle}>{product.name}</div>
      <div style={metaStyle}>
        {product.brand} · {product.category}
      </div>
      <div style={priceStyle}>Цена: {product.price}</div>
      {product.characteristics.map((c, i) => (
        <div key={i} style={charRowStyle}>
          {c}
        </div>
      ))}
    </div>
  );
}
