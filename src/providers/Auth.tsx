import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import LoginRegister from "@/components/LoginRegister";
import useAxios from "@/hooks/useAxios";

interface Auth {
  id: string;
  email: string;
  accessToken: string;
}

interface AuthContextType {
  auth: Auth | null;
  logout: () => void;
  setAuth: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null);
  const axios = useAxios();

  useEffect(() => {
    const refreshToken = async () => {
      const response = await axios.get("/auth/refresh");

      console.log(response);

      if (response.data.accessToken) {
        setAuth(response.data);
      }

      setIsLoading(false);
    };

    if (!auth) {
      refreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => setAuth(null);

  const value = {
    auth,
    setAuth,
    logout,
  };

  if (isLoading) {
    return <div>LOADING....</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {!auth ? <LoginRegister /> : children}
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
