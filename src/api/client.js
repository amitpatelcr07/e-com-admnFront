import { API_BASE_URL } from "./endpoints";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || data?.error || "Something went wrong";
    throw new Error(message);
  }

  return data;
};

export const apiClient = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
   console.log("API Request: ************", {
    url: `${API_BASE_URL}${endpoint}`,
    method: options.method || "GET",
    body: options.body,
  });

  let responseData;
  try {
    responseData = await parseResponse(response);
    console.log("API Response: ************", responseData);
  } catch (error) {
    console.error("API Error: ************", error.message);
    throw error;
  } 
  return responseData;
};
