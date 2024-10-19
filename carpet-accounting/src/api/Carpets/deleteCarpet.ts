import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";

/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

const useDeleteCarpet = (id: string | string[], options = {}) => {
  return useMutation({
    mutationFn: () =>
      apiClient.delete(`/carpets/carpets/${id}`,{headers:{Authorization:`Bearer ${accessToken}`}}),

    ...options,
  });
};

export default useDeleteCarpet;
