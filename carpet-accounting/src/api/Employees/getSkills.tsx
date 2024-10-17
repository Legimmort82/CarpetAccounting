
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



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