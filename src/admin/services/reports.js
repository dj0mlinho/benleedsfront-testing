import http from "../services/http" ;
// axios.defaults.headers.common['Authorization'] = `Bearer ${fechToken()}`


export function getAllReports() {
  console.log("usaooooooo 2222")
  return http.get("http://localhost:8080/api/v1/reports"  )
}

export function getOneReport(id) {
  return http.get( "http://localhost:8080/api/v1/reports/" + id + "?user=true&building=true&jobs=true" )
}

export function sendVendorsToReport(vendors) {
   console.log("vendorsi za back" , vendors);
   
} 

// {
//   "vendors": [
//       {
//           "vendor": "5db4e3e57f48fb3f881a1107",
//           "startDate": "",
//           "endDate": ""
//       }
//   ]
// }








