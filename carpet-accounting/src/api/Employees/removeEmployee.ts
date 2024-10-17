import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";


/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */
const useDeleteEmployee = (id:string | string[] | undefined,options = {}) => {
  return useMutation({
    mutationFn: () => apiClient.delete(`/accounts/workers/${id}/`),

    ...options,
  });
};

export default useDeleteEmployee;
