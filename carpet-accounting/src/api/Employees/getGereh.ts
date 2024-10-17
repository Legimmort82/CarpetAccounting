

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



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