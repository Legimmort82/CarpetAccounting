import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";


/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useDeleteEmployee = (id:string | string[] | undefined,options = {}) => {
  return useMutation({
    mutationFn: () => apiClient.delete(`/accounts/workers/${id}/`,{headers:{Authorization:`Bearer ${accessToken}`}}),

    ...options,
  });
};

export default useDeleteEmployee;
