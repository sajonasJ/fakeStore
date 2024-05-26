// service/authService.js
const fakeStoreAPI = "https://fakestoreapi.com";

export const signUpUser = async (userData) => {
  try {
    console.log("Sending signup request with data:", userData);

    const response = await fetch(`${fakeStoreAPI}/users`, { // Updated endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const textResponse = await response.text(); // Get response as text first
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response body (text):", textResponse);

    if (!response.ok) {
      throw new Error(textResponse || "Network response was not ok");
    }

    const data = JSON.parse(textResponse); // Parse JSON only if response is OK
    console.log("User created successfully:", data); // Log the successful response
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
