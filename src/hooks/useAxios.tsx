import { useEffect } from "react";

import axios from "@/axios";

const useAxios = () => {
  useEffect(() => {
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        return (
          error?.response ?? {
            error: "Unexpected error",
            message: "Unexpected error. Please try again.",
          }
        );
      },
    );

    return () => {
      axios.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axios;
};

export default useAxios;
