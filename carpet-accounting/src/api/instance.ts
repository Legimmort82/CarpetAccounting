import axios from "axios";

const createApiClient = (baseUrl :string | undefined) => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
      Accept: "application/json",
    },
  });

  return instance;
};

const apiClient = createApiClient(process.env.CARPET_API);

export { apiClient };
