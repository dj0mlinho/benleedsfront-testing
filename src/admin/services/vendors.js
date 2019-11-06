import http from "../services/http" ;


export function getAllVendors() {
  return http.get("api/v1/vendors?status=active&sort=function" )
}

export function getVendor(id) {
  return http.get("api/v1/vendors/" + id )

}

export function createVendor(vendor) {
  //  console.log("vendor obj" , vendor)
  return http.post("api/v1/vendors/" ,  vendor)
}

export function editVendor(vendor, id) {
  return http.put("api/v1/vendors/" + id , vendor)

}

export function deleteVendor(id) {
  // console.log("delete id" , id);
   return http.delete("api/v1/vendors/" + id )
}


///// create new vendor post {{URL}}/api/v1/vendors
// {
//   "function": "Blinds",
//   "contact": "Arturo Gonzalez Vivanco",
//   "company": "Arturo Gonzalez Vivanco",
//   "phoneNumber": "661-312-9219",
//   "email": "vivancoshades@gmail.com"
// }

//// update isto samo put  {{URL}}/api/v1/vendors/5db2eee8f7ffc1344820e46d
// {
//   "function": "Blinds",
//   "contact": "Arturo Gonzalez Vivanco",
//   "company": "Arturo Gonzalez Vivanco",
//   "phoneNumber": "661-312-9219",
//   "email": "vivancoshades@gmail.com"
// }