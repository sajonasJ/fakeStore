const server = "172.16.11.240";
const apiBaseURL = `http://${server}:3000`;

function parseJSON(response) {
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error('Failed to parse response:', response);
    throw new Error('Invalid server response');
  }
}

// Sign-Up User
export const signUpUser = async (userData) => {
  try {
    console.log("Sending signup request with data:", userData);

    const response = await fetch(`${apiBaseURL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const textResponse = await response.text();

    if (!response.ok) {
      console.error("Server responded with error status");
      throw new Error(textResponse || "Network response was not ok");
    }

    const data = JSON.parse(textResponse);
    console.log("User created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign-In User
export const signInUser = async (userData) => {
  try {
    console.log("Sending signin request with data:", userData);

    const response = await fetch(`${apiBaseURL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const textResponse = await response.text();
    // console.log("Response status:", response.status);
    // console.log("Response headers:", response.headers);

    if (!response.ok) {
      // console.error("Server responded with error status");
      throw new Error(textResponse || "Network response was not ok");
    }

    const data = JSON.parse(textResponse);
    // console.log("User signed in successfully:", data);
    if (data.status === "error") {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    // console.error("Error signing in:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  // console.log("Sending update request with data:", userData);

  try {
    const response = await fetch(`${apiBaseURL}/users/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userData.token}`, // Use the token from user data
      },
      body: JSON.stringify({
        name: userData.name,
        password: userData.password,
      }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const textResponse = await response.text();
    console.log("Response body (text):", textResponse);

    const data = JSON.parse(textResponse);
    console.log("Parsed response body:", data);

    if (data.status !== "OK") {
      console.error("Error status received:", data.message);
      throw new Error(data.message);
    }

    console.log("User updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


export const createOrder = async (orderData) => {
  try {
    console.log("Creating order with data:", orderData);

    const response = await fetch(`${apiBaseURL}/orders/neworder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${orderData.token}`,
      },
      body: JSON.stringify({ items: orderData.items }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const textResponse = await response.text();
    console.log("Response body (text):", textResponse);

    const data = JSON.parse(textResponse);
    console.log("Parsed response body:", data);

    if (data.status !== "OK") {
      console.error("Error status received:", data.message);
      throw new Error(data.message);
    }

    console.log("Order created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getAllOrders = async (token) => {
  try {
    console.log("Fetching all orders");

    const response = await fetch(`${apiBaseURL}/orders/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const textResponse = await response.text();
    const data = JSON.parse(textResponse);

    if (data.status !== "OK") {
      console.error("Error status received:", data.message);
      throw new Error(data.message);
    }

    return data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


export const updateOrderStatus = async (orderData) => {
  try {
    console.log("Updating order status with data:", orderData);

    const response = await fetch(`${apiBaseURL}/orders/updateorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${orderData.token}`,
      },
      body: JSON.stringify({
        orderID: orderData.orderID,
        isPaid: orderData.isPaid,
        isDelivered: orderData.isDelivered,
      }),
    });

    const data = await response.json();
    console.log("Order status update response:", data);

    if (data.status !== "OK") {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const addCart = async (cartData) => {
  try {
    console.log("Adding/updating cart with data:", cartData);

    const response = await fetch(`${apiBaseURL}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cartData.token}`, // Assuming token is passed in cartData
      },
      body: JSON.stringify({ items: cartData.items }),
    });

    const textResponse = await response.text();
    const data = JSON.parse(textResponse);

    if (data.status !== "OK") {
      console.error("Error status received:", data.message);
      throw new Error(data.message);
    }

    console.log("Cart updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const getCart = async (token) => {
  try {
    console.log("Fetching cart items");

    const response = await fetch(`${apiBaseURL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const textResponse = await response.text();
    const data = JSON.parse(textResponse);

    if (data.status !== "OK") {
      console.error("Error status received:", data.message);
      throw new Error(data.message);
    }

    console.log("Cart items fetched successfully:", data.items);
    return data.items;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};