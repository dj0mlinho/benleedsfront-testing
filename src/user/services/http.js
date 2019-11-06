import { apiUrl } from "../configure.json";

import http from "../../admin/services/http";
export function login(user) {
  return http.post("api/v1/auth/login", user);
}

export function getReport(buildingInfo) {
  return http.post("api/v1/reports", buildingInfo);
}
export function updateQuestion(question, id) {
  return http.put(`api/v1/reports/${id}`, question);
}
// §
// import { currentUserEndpoint, buildingsEndpoint } from "./http";

// const instance = axios.create({
//     baseURL: "auth/login"
// })

export const currentUserEndpoint = apiUrl + "/api/v1/auth/me";
export const buildingsEndpoint = apiUrl + "/api/v1/buildings";
export const reportsEndpoint = apiUrl + "/api/v1/reports";
export const roomsEndpoint = apiUrl + "/api/v1/rooms";
export const itemsEndpoint = apiUrl + "/api/v1/items";
export const jobsEndpoint = apiUrl + "/api/v1/jobs";
