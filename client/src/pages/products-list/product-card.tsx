import type { Product } from '@/entities/product/model/types';
import { ProductThumb } from './product-thumb';

const priceFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
});

function formatKopecks(kopecks: number): string {
  return priceFormat.format(kopecks / 100);
}

export function ProductCard({ product }: { product: Product }) {
  return (

    <div className="pb-3">
      <article
        aria-label={product.name}
        className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
      >
        <ProductThumb
          category={product.category}
          className="float-left mr-4 mb-2 h-36 w-36 rounded-lg"
        />

        <h3 className="text-base leading-snug font-semibold text-zinc-900">{product.name}</h3>

        <div className="mt-1 text-lg font-bold tabular-nums text-zinc-900">
          {formatKopecks(product.price)}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] tracking-wide text-zinc-600 uppercase">
            {product.category}
          </span>
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[11px] tracking-wide text-indigo-700 uppercase">
            {product.brand}
          </span>
        </div>

        <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
          {product.characteristics.map((characteristic) => (
            <li
              key={characteristic}
              className="rounded-md border border-zinc-100 bg-zinc-50 px-2 py-1 text-xs text-zinc-700"
            >
              {characteristic}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
