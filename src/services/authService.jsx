// import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";
import axios from "axios";
import qs from "qs";
const apiEndpoint = process.env.REACT_APP_API_URL + "/login";
// const tokenKey = "token";

// http.setJwt(getJwt());

export async function login(email, password) {
  // const { data: jwt } = await http.post(apiEndpoint, { email, password });
  const params = {
    email: email,
    password: password
  };
  console.log(email, password);
  const data = await axios.post(
    process.env.REACT_APP_API_URL + "/login",
    qs.stringify(params)
  );

  // localStorage.setItem("user", response);

  return data;
  //   localStorage.setItem(tokenKey, jwt);

  // return http.post(apiEndpoint, { email, password });
}

export function getCurrentUser() {
  if (!localStorage.getItem("admin")) {
    return null;
  } else {
    return localStorage.getItem("admin");
  }
}

export default {
  login,
  getCurrentUser
  //   loginWithJwt,
  //   logout,

  //   getJwt
};
