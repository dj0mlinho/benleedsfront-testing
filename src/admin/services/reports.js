import http from "../services/http" ;
// axios.defaults.headers.common['Authorization'] = `Bearer ${fechToken()}`


export function getAllReports() {
  console.log("usaooooooo 2222")
  return http.get("api/v1/reports"  )
}

export function getOneReport(id) {
  return http.get( "api/v1/reports/" + id + "?user=true&building=true&jobs=true" )
}

export function finishReport(reportId) {
   
  const obj = {
    adminStatus : "finished"
  }

  return http.put( "api/v1/reports/" + reportId, obj )
}

export function sendVendorsToReport(reportId, vendors) {
   const vendorsArrey = vendors.map(vendor => ({
     vendor : vendor._id ,
     startDate : vendor.startDate,
     endDate : vendor.endDate
   })) ;
   const vednorObjAndStatus = {
      vendors : vendorsArrey ,
      adminStatus : "sent"
   }
   return http.put("api/v1/reports/" + reportId , vednorObjAndStatus)
   
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



// (3) [{…}, {…}, {…}]
// 0:
// company: "Athens"
// contact: ""
// createdAt: "2019-10-30T20:45:48.947Z"
// email: ""
// endDate: "2019-10-30T19:08:44.100Z"
// function: "Trash"
// phoneNumber: "(888) 909-5556"
// phoneNumber2: ""
// reports: (2) [{…}, {…}]
// startDate: "2019-10-30T19:08:44.100Z"
// updatedAt: "2019-10-30T21:20:44.668Z"
// __v: 9
// _id: "5db9f67cdaec987fea3faad0"
// __proto__: Object
// 1:
// company: "CREC Construction"
// contact: "Cesar Espeleta"
// createdAt: "2019-10-30T20:45:48.946Z"
// email: "crec.constructioninc@gmail.com"
// endDate: null
// function: "Make Ready"
// phoneNumber: "(213) 509-2112"
// phoneNumber2: ""
// reports: (2) [{…}, {…}]
// startDate: null
// updatedAt: "2019-10-30T21:20:44.689Z"
// __v: 8
// _id: "5db9f67cdaec987fea3faabc"
// __proto__: Object
// 2:
// company: "Young Moon Painting"
// contact: "Robby"
// createdAt: "2019-10-30T20:45:48.946Z"
// email: "youngmoonpainting@gmail.com"
// endDate: "2019-11-06"
// function: "Painting"
// phoneNumber: "(626) 350-8357"
// phoneNumber2: ""
// reports: []
// startDate: ""
// updatedAt: "2019-10-30T20:45:48.946Z"
// __v: 0
// _id: "5db9f67cdaec987fea3faac3"
// __proto__: Object
// length: 3








