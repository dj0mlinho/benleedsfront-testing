import http from "./httpService";
import qs from "qs";

export function getAllVendors() {
  return http.get(process.env.REACT_APP_API_URL + "/admin/vendors");
}

export function getVendor(vendorId) {
  return http.get(process.env.REACT_APP_API_URL + `/admin/vendors/${vendorId}`);
}

export function deleteVendor(vendor) {
  return http.post(
    process.env.REACT_APP_API_URL + `/admin/editVendor/${vendor._id}`,
    qs.stringify({
      email: vendor.email,
      name: vendor.name,
      phone : vendor.phone, 
      profession: vendor.profession,
      status : "disabled"
    })
  );


}

export function saveVendor(vendor) {
  // console.log(vendor);

  if (vendor._id === "") {
    // console.log("ovde sam");
    
    return http.post(
      process.env.REACT_APP_API_URL + `/admin/newVendor`,
      qs.stringify({
        email: vendor.email,
        name: vendor.name,
        phone : vendor.phone, 
        profession: vendor.profession
      })
    );
  }

  return http.post(
    process.env.REACT_APP_API_URL + `/admin/editVendor/${vendor._id}`,
    qs.stringify({
      email: vendor.email,
      name: vendor.name,
      phone : vendor.phone, 
      profession: vendor.profession
    })
  );
}
