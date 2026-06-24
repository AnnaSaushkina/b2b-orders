export async function fetchProducts(limit: number, offset: number) {
  const res = await fetch(`http://localhost:4000/products?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data;
}
