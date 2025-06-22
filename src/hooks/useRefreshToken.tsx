import { useAuthContext } from "@/providers/Auth";
import useAxios from "@/hooks/useAxios";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();
  const axios = useAxios();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuth(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
