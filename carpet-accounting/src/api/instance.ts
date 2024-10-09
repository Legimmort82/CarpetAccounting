import axios from "axios";

const createApiClient = () => {
  const instance = axios.create({
    baseURL: "127.0.0.1:8000/",
    timeout: 30000,
    headers: {
      Accept: "application/json",
    },
  });

  return instance;
};

const apiClient = createApiClient();

export { apiClient };
