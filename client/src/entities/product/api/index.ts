import type { Product } from '../model/types';
type ProductsResponse = {
  items: Product[];
  total: number;
};
export async function fetchProducts(
  limit: number,
  offset: number,
  abortSignal: AbortSignal,
  search: string,
): Promise<ProductsResponse> {
  const res = await fetch(
    `${process.env.API_URL}/products?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}`,
    {
      signal: abortSignal,
    },
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}
