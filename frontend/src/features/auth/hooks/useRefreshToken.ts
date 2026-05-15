import { refreshToken } from "../api";

import { useMutation } from "@tanstack/react-query";

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};