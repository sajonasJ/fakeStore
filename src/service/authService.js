// service/authService.js
const server = "172.16.11.240";
const apiBaseURL = `http://${server}:3000`;
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
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response body (text):", textResponse);

    if (!response.ok) {
      console.error("Server responded with error status");
      throw new Error(textResponse || "Network response was not ok");
    }

    if (textResponse.startsWith('<')) {
      console.error("Unexpected HTML response: ", textResponse);
      throw new Error("Unexpected HTML response from server");
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
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response body (text):", textResponse);

    if (!response.ok) {
      console.error("Server responded with error status");
      throw new Error(textResponse || "Network response was not ok");
    }

    if (textResponse.startsWith('<')) {
      console.error("Unexpected HTML response: ", textResponse);
      throw new Error("Unexpected HTML response from server");
    }

    const data = JSON.parse(textResponse);
    console.log("User signed in successfully:", data);
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
