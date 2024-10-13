

import { useQuery,UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../instance";



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