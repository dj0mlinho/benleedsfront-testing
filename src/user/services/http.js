import { apiUrl } from "../configure.json";
// import { currentUserEndpoint, buildingsEndpoint } from "./http";

// const instance = axios.create({
//     baseURL: "http://localhost:8080/auth/login"
// })

export const currentUserEndpoint = apiUrl + "/api/v1/auth/me";
export const buildingsEndpoint = apiUrl + "/api/v1/buildings";
