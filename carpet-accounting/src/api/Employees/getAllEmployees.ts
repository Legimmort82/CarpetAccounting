

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetAllEmployees = (options = {}) => {
  return useQuery({
    queryKey: ["AllEmployees"],
    queryFn: () => apiClient.get("/accounts/workers"),
    retry: 1,
    ...options,
  });
};
export default useGetAllEmployees;