import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetHelps = (options = {}) => {
  return useQuery({
    queryKey: ["Helps"],
    queryFn: () => apiClient.get("/accounts/helps"),
    retry: 1,
    ...options,
  });
};
export default useGetHelps;
