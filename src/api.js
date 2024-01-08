const API_END_POINT = "https://fakestoreapi.com/products";

export async function request(url) {
  const res = await fetch(url);
  return await res.json();
}

export const fetchProducts = async () => request(API_END_POINT);
export const fetchProduct = async (productId) =>
  request(API_END_POINT + `/${productId}`);
