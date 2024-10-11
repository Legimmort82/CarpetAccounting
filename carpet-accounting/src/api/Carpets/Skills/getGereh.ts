import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetGereh = (options = {}) => {
  return useQuery({
    queryKey: ["GerehSkill"],
    queryFn: () => apiClient.get("/accounts/sections/gereh/"),
    retry: 1,
    ...options,
  });
};
export default useGetGereh;