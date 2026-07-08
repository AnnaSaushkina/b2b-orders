export async function fetchProducts(limit: number, offset: number) {
  const res = await fetch(`http://localhost:4000/products?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
}
