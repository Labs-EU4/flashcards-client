import axios from "axios";

export const baseURL =
  process.env.REACT_APP_API_HOST || "https://flashdecks-staging.herokuapp.com/api";

export const justAxios = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  return instance;
};
