import { apiClient } from "../../api/client";
import { API_ENDPOINTS } from "../../api/endpoints";

export const loginUser = ({ email, password }) => {
  return apiClient(API_ENDPOINTS.auth.login, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = ({ firstName, lastName, email, password }) => {
  const name = `${firstName} ${lastName}`.trim();

  return apiClient(API_ENDPOINTS.auth.register, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};
