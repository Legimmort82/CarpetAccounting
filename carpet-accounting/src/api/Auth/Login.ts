import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../instance";

type props = {
  data: object;
};

/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */

const useLogin = (options = {}) => {
  return useMutation({
    mutationFn: ( data : props) => apiClient.post(`/accounts/token/`, data),

    ...options,
  });
};

export default useLogin;
