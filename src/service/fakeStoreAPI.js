const fakeStoreAPI = "https://fakestoreapi.com";

export async function fetchProducts() {
  try {
    const response = await fetch(`${fakeStoreAPI}/products`);
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

export async function loadCart() {
  try {
    const response = await fetch(`${fakeStoreAPI}/cart`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function saveCart() {
  try {
    const response = await fetch(`${fakeStoreAPI}/cart`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
}
