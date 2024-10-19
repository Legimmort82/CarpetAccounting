

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetCheleh = (options = {}) => {
  return useQuery({
    queryKey: ["ChelehSkill"],
    queryFn: () => apiClient.get("/accounts/sections/chelleh/",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetCheleh;