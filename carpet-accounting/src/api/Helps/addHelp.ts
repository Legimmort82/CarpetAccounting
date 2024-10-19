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
const useAddHelp = (options = {}) => {
  return useMutation({
    mutationFn: ( data : props) => apiClient.post(`/accounts/helps/`, data,{headers:{Authorization:`Bearer ${accessToken}`}}),

    ...options,
  });
};

export default useAddHelp;
