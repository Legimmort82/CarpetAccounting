
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../instance";


/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetDesigns = (options = {}) => {
  return useQuery({
    queryKey: ["Designs"],
    queryFn: () => apiClient.get("/carpets/designs/",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetDesigns;
