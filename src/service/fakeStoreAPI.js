const fakeStoreAPI = 'https://fakestoreapi.com/products';

// func to fetch data
export default async function fetchProducts() {
    const response = await fetch(fakeStoreAPI);
    const data = await response.json();
    return data;
  }