// Import

// Libraries
import axios from "axios";
import decode from "jwt-decode";

// Configs
const baseUrl =
  process.env.REACT_APP_API_HOST || "https://flashdecks-staging.herokuapp.com/api";

const KEY = "token";

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem(KEY);
};

export const getToken = () => {
  try {
    const token = localStorage.getItem(KEY);
    if (token === null || !token) {
      return undefined;
    }
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      clearLocalStorage();
      return undefined;
    }
    return JSON.parse(token);
  } catch (error) {
    // if error decoding, clear what is in local storage with key
    clearLocalStorage();
    return undefined;
  }
};

export const setToken = token => {
  try {
    const item = token;
    localStorage.setItem(KEY, item);
    return true;
  } catch (error) {
    return undefined;
  }
};

export const axiosWithAuth = () => {
  const token = getToken();
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    baseURL: baseUrl,
  });
};

export const getUserId = () => {
  const token = localStorage.getItem("token");
  const decoded = decode(token);
  return decoded;
};

export const isAccountCreationFinished = token => {
  const decodedToken = decode(token);
  return decodedToken.subject ? true : false;
};
