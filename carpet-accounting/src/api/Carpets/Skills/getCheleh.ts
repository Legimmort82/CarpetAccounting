import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetCheleh = (options = {}) => {
  return useQuery({
    queryKey: ["ChelehSkill"],
    queryFn: () => apiClient.get("/accounts/sections/chelleh/"),
    retry: 1,
    ...options,
  });
};
export default useGetCheleh;