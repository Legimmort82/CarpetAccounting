
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../instance";



/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */ 
const accessToken =
typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
const useGetSingleEmployee = (id:string | string[]|undefined,options = {}) => {
  return useQuery({
    queryKey: ["SingleEmployee"],
    queryFn: () => apiClient.get(`/accounts/workers/${id}`,{headers:{Authorization:`Bearer ${accessToken}`}}),
    retry: 1,
    ...options,
  });
};
export default useGetSingleEmployee;