export async function fetchProducts(limit: number, offset: number, abortSignal: AbortSignal) {
  const res = await fetch(`${process.env.API_URL}/products?limit=${limit}&offset=${offset}`, {
    signal: abortSignal,
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}
