import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetCircleSizes = (options = {}) => {
  return useQuery({
    queryKey: ["CircleSizes"],
    queryFn: () => apiClient.get("/carpets/sizes/circles/radius/"),
    retry: 1,
    ...options,
  });
};
export default useGetCircleSizes;
