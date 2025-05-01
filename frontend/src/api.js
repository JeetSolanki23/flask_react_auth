const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Request failed");
  }

  return response.json();
};
