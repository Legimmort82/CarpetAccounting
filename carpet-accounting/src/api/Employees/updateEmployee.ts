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
const useUpdateEmployee = (options = {}) => {
  return useMutation({
    mutationFn: ({ data, id }: props) => apiClient.put(`/accounts/workers/${id}/update`, data),

    ...options,
  });
};

export default useUpdateEmployee;
