import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";

type props = {
  data?: object;
};

/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */

const useCheckToken = (options = {}) => {
  return useMutation({
    mutationFn: ( data : props) => apiClient.post(`/accounts/token-verify/`, data,{headers:{Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5MTg5MzI5LCJpYXQiOjE3MjkxODc1MjksImp0aSI6IjhkNzljMmUyNTg5OTQ5YWI5MzJjNGJmODhkMTk4Y2YwIiwidXNlcl9pZCI6MX0.7CqvC_qEx6Ne9j7L2FtJj0b47VwSE1rV_N6eOqxlTd4`}}),

    ...options,
  });
};

export default useCheckToken;