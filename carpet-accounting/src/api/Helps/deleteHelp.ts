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
const useDeleteHelp = (id: string | string[], options = {}) => {
  return useMutation({
    mutationFn: ({ data }: props) =>
      apiClient.delete(`/accounts/helps/${id}`, data),
    ...options,
  });
};

export default useDeleteHelp;
