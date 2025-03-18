import { createContext } from "react";

export interface User {
  username: string;
  fullName: string;
  role: string;
  token: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
