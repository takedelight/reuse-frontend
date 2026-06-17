import { type User } from "@/src/entity/user";
import { createContext } from "react";

interface AuthContextProps {
  values: {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
}

const defaultValues: AuthContextProps = {
  values: {
    isAuthenticated: false,
    isLoading: false,
    user: null,
  },
};

export const AuthContext = createContext<AuthContextProps>(defaultValues);
