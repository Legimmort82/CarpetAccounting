import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";

type props = {
  data?: object;
};
/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */
const useAddCarpet = (options = {}) => {
  return useMutation({
    mutationFn: ( data : props) => apiClient.post(`/carpets/carpets/`, data),

    ...options,
  });
};

export default useAddCarpet;
