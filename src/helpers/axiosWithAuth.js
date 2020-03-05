import axios from "axios";

export default function axiosWithAuth() {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    baseURL: "http://flashdecks-staging.herokuapp.com/",
    headers: {
      Authorization: token,
    },
  });
  return axiosInstance;
}
