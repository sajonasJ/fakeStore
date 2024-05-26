const fakeStoreAPI = "https://fakestoreapi.com/products";

export default async function fetchProducts() {
  try {
    const response = await fetch(fakeStoreAPI);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
