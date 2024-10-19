

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetShirazeh = (options = {}) => {
  return useQuery({
    queryKey: ["ShirazehSkill"],
    queryFn: () => apiClient.get("/accounts/sections/shirazeh/",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetShirazeh;