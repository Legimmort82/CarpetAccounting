import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetSingleCarpet = (options = {}) => {
  return useQuery({
    queryKey: ["SingleCarpet"],
    queryFn: (id) => apiClient.get(`/carpets/carpets/${id}`,{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetSingleCarpet;
