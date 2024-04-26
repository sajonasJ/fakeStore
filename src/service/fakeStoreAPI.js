const fakeStoreAPI = 'https://fakestoreapi.com/products';

export default async function fetchProducts() {
    const response = await fetch(fakeStoreAPI);
    const data = await response.json();
    return data;
  }