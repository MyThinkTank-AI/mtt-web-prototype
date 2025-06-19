import { createContext, ReactNode, useState } from "react";

import LoginRegister from "@/components/LoginRegister";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {};

  const logout = () => {};

  const value = {
    user,
    login,
    logout,
  };

  if (!user) {
    return <LoginRegister />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
