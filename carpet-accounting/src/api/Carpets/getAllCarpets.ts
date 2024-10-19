import { apiClient } from "@/api/instance";
import { useQuery } from "@tanstack/react-query";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetAllCarpets = (options = {}) => {
  return useQuery({
    queryKey: ["AllCarpets"],
    queryFn: () => apiClient.get("/carpets/carpets",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetAllCarpets;
