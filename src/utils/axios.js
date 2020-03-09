import axios from "axios";

export const justAxios = () => {
  const instance = axios.create({
    baseURL: "https://flashdecks-staging.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export const withAuth = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  const instance = axios.create({
    baseURL: "https://flashdecks-staging.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  return instance;
};
