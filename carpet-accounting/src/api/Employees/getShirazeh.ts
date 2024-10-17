

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



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