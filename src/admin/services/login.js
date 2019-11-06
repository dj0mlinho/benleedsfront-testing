import http from "../services/http" ;

export function login(user) {
  return http.post("api/v1/auth/login" , user)
}

export function getUserAuthCheck(token) {
  return http.get("api/v1/auth/me" , {
    headers : {
      "Authorization" : 'Bearer ' + token
    }
  })
}

