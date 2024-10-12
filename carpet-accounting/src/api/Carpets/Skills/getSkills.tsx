import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetSkills = (options = {}) => {
  return useQuery({
    queryKey: ["Skills"],
    queryFn: () => apiClient.get("/accounts/sections/"),
    retry: 1,
    ...options,
  });
};
export default useGetSkills;