import http from "../services/http" ;


export function getAllVendors() {
  return http.get("http://localhost:8080/api/v1/vendors?status=active" )
}