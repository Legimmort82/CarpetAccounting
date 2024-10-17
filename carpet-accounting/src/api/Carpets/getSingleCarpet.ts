import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetSingleCarpet = (options = {}) => {
  return useQuery({
    queryKey: ["SingleCarpet"],
    queryFn: (id) => apiClient.get(`/carpets/carpets/${id}`),
    retry: 1,
    ...options,
  });
};
export default useGetSingleCarpet;
