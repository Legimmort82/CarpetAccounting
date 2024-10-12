import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetShirazeh = (options = {}) => {
  return useQuery({
    queryKey: ["ShirazehSkill"],
    queryFn: () => apiClient.get("/accounts/sections/shirazeh/"),
    retry: 1,
    ...options,
  });
};
export default useGetShirazeh;