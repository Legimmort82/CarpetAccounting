import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../instance";


/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetDesigns = (options = {}) => {
  return useQuery({
    queryKey: ["Designs"],
    queryFn: () => apiClient.get("/carpets/designs/"),
    retry: 1,
    ...options,
  });
};
export default useGetDesigns;
