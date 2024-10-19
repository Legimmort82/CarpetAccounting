import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../instance";

/**
 * login user with credentials
 * @param {UseMutationOptions} options
 * @returns UseMutationResult
 */

const useCheckToken = (options = {}) => {
  return useMutation({
    mutationFn: ( ) => apiClient.get(`/accounts/token-verify/`,{headers:{Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5MzIwNzkyLCJpYXQiOjE3MjkzMTg5OTIsImp0aSI6ImE2ZDEyYTIyYTYxZjQxNGJhNjVkMzIyMTA1MGNjNjBmIiwidXNlcl9pZCI6MX0.rXCiIZbeE3KmiOMzt86kOxwpuyePt-SBB9vRCk7mx-w`}}),

    ...options,
  });
};

export default useCheckToken;