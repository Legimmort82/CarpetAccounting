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
const useUpdateEmployee = ( id:string | string[] | undefined,options = {}) => {
  return useMutation({
    mutationFn: ( data : props) =>
      apiClient.put(`/accounts/workers/${id}/`, data),
    ...options,
  });
};

export default useUpdateEmployee;
