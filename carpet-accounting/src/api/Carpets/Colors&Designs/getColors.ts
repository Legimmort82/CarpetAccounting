
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../instance";


/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetAllColors = (options = {}) => {
  return useQuery({
    queryKey: ["Colors"],
    queryFn: () => apiClient.get("/carpets/colors"),
    retry: 1,
    ...options,
  });
};
export default useGetAllColors;
