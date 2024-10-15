
import { useQuery,UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../instance";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */ 
const useGetSingleEmployee = (id:string | string[]|undefined,options = {}) => {
  return useQuery({
    queryKey: ["SingleEmployee"],
    queryFn: () => apiClient.get(`/accounts/workers/${id}`),
    retry: 1,
    ...options,
  });
};
export default useGetSingleEmployee;