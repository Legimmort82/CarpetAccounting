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
const useDeleteCarpet = (id: string | string[], options = {}) => {
  return useMutation({
    mutationFn: ({ data }: props) =>
      apiClient.delete(`/carpets/carpets/${id}`, data),

    ...options,
  });
};

export default useDeleteCarpet;
