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

const useAddCarpet = (options = {}) => {
  return useMutation({
    mutationFn: ( data : props) => apiClient.post(`/carpets/carpets/`, data,{headers:{Authorization:`Bearer ${accessToken}`}}),

    ...options,
  });
};

export default useAddCarpet;
