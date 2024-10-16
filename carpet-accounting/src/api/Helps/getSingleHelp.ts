import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetSingleHelps = (id:string | string[],options = {}) => {
  return useQuery({
    queryKey: ["SingleHelps"],
    queryFn: () => apiClient.get(`/accounts/helps/4`),
    retry: 1,
    ...options,
  });
};
export default useGetSingleHelps;
