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

export function ProductCard({ product }: { product: Product }) {
  const rowCount = 1 + (product.id % 10) * 2;
  const rows = Array.from(
    { length: rowCount },
    (_, i) => product.characteristics[i % product.characteristics.length] ?? `Характеристика ${i + 1}`,
  );

  return (
    <div>
      <div style={titleStyle}>{product.name}</div>
      <div style={metaStyle}>
        {product.brand} · {product.category}
      </div>
      <div style={priceStyle}>Цена: {product.price}</div>
      {rows.map((c, i) => (
        <div key={i} style={charRowStyle}>
          {c}
        </div>
      ))}
    </div>
  );
}
