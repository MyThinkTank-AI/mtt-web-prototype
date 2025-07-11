import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
});
