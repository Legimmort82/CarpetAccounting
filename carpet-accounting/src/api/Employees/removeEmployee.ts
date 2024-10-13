import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../instance";

type props = {
  data: object;
  id: number;
};
/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */
const useDeleteEmployee = (options = {}) => {
  return useMutation({
    mutationFn: ({ data, id }: props) => apiClient.delete(`/accounts/workers/${id}/delete`, data),

    ...options,
  });
};

export default useDeleteEmployee;
