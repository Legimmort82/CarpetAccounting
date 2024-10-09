import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./instance";
import axios from "axios";

/**
 *
 * @param {UseQueryOptions} options
 * @returns UseQueryResult
 */
const useGetAllColors = (options = {}) => {
  return useQuery({
    queryKey: ["Colors"],
    queryFn: () => axios.get("127.0.0.1:8000/carpets/colors"),
    retry: 1,
    ...options,
  });
};
export default useGetAllColors;
