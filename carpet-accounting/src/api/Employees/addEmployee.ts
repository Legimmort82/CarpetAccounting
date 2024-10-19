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
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useAddEmployee = (options = {}) => {
  return useMutation({
    mutationFn: ( data : props) => apiClient.post(`/accounts/workers/`, data,{headers:{Authorization:`Bearer ${accessToken}`}}),

    ...options,
  });
};

export default useAddEmployee;
