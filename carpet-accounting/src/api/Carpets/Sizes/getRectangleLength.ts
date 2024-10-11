import { apiClient } from "@/api/instance";
import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetRectangleLength = (options = {}) => {
  return useQuery({
    queryKey: ["Lengths"],
    queryFn: () => apiClient.get("/carpets/sizes/rectangles/lengths"),
    retry: 1,
    ...options,
  });
};
export default useGetRectangleLength;
