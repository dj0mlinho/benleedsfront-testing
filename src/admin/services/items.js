import http from "../services/http" ; 

/// get all items GET {{URL}}/api/v1/items

export function getAllRooms() {
    return http.get("api/v1/rooms")
}

/// get single item GET {{URL}}/api/v1/items/ + id

/// create item POST {{URL}}/api/v1/items 
// {
//   "price": 30,
//   "name": "Repair front door",
//   "subcategory": "Door",
//   "room": "Living roomm"
// }

//// update item PUT {{URL}}/api/v1/items/ +id
// {
//   "room": "living room",
// }

//// delete Item DELETE {{URL}}/api/v1/items/ +id
