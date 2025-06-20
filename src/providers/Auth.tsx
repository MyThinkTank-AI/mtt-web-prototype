import { createContext, ReactNode, useContext, useState } from "react";

import LoginRegister from "@/components/LoginRegister";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  setUser: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {};

  const value = {
    user,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!user ? <LoginRegister /> : children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be withing a AuthProvider");
  }
  return context;
};

export default AuthContext;
