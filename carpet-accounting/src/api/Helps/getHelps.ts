import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetHelps = (options = {}) => {
  return useQuery({
    queryKey: ["Helps"],
    queryFn: () => apiClient.get("/accounts/helps",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetHelps;
