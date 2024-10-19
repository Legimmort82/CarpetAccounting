
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../instance";


/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

const useGetAllColors = (options = {}) => {
  return useQuery({
    queryKey: ["Colors"],
    queryFn: () => apiClient.get("/carpets/colors",{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetAllColors;
