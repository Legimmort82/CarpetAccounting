import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetSingleHelps = (id:string | string[],options = {}) => {
  return useQuery({
    queryKey: ["SingleHelps"],
    queryFn: () => apiClient.get(`/accounts/helps/4`,{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetSingleHelps;
