
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetSkills = (options = {}) => {
  return useQuery({
    queryKey: ["Skills"],
    queryFn: () => apiClient.get("/accounts/sections/",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetSkills;