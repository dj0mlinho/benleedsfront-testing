import http from "./httpService" ;

export function getJobs() {
  return http.get(process.env.REACT_APP_API_URL + `/admin/jobs`)
}

export  function  getAllWorkorders(){
  return http.get(process.env.REACT_APP_API_URL + "/admin")
}
