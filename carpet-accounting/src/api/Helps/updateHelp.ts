import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";

type props = {
  data: object;
};
/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useUpdateHelp = (id:string | string[],options = {}) => {
  return useMutation({
    mutationFn: ({ data }: props) => apiClient.put(`/accounts/helps/${id}`, data,{headers:{Authorization:`Bearer ${accessToken}`}}),

    ...options,
  });
};

export default useUpdateHelp;
