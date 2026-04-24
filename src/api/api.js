const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;

  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
};