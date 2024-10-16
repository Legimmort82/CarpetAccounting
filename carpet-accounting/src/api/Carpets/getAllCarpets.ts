import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetAllCarpets = (options = {}) => {
  return useQuery({
    queryKey: ["AllCarpets"],
    queryFn: () => apiClient.get("/carpets/carpets"),
    retry: 1,
    ...options,
  });
};
export default useGetAllCarpets;
