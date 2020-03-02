import axios from "axios";

export default function axiosWithAuth() {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4003",
    headers: {
      Authorization: token,
    },
  });
  return axiosInstance;
}
