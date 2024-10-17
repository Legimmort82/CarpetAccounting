import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetRectangleWidth = (options = {}) => {
  return useQuery({
    queryKey: ["Widths"],
    queryFn: () => apiClient.get("/carpets/sizes/rectangles/widths"),
    retry: 1,
    ...options,
  });
};
export default useGetRectangleWidth;
