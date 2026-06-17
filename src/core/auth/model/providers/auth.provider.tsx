"use client";

import { type User } from "@/src/entity/user";
import { API_URL } from "@/src/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/auth.context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery<User | null>({
    queryKey: ["check-auth"],
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        return null;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();

      console.log(data);

      return data;
    },
  });

  const contextValue = {
    values: {
      isLoading,
      isAuthenticated: !!data,
      user: data ?? null,
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
