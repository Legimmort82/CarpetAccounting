import axios from "axios";

const createApiClient = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 30000,
    headers: {
      Accept: "application/json",
    },
  });

  return instance;
};

const apiClient = createApiClient();

export { apiClient };
