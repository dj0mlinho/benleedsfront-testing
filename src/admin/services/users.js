import http from "../services/http" ;


export function getUser(id) {
  return http.get("api/v1/users/" + id )

}

export function deleteUser(id) {
  // console.log("delete id" , id);
  
  return http.delete("api/v1/users/" + id )

}

export function editUser(user, id) {
  return http.put("api/v1/users/" + id , user)

}

export function getAllUsers() {
  return http.get("api/v1/users?role=user&status=active" )
}

//  user = {
// 	"name":"Yoana",
// 	"email":"yoana@benleedsapp.com",
// 	"region":"West LA",
// 	"password":"123"
// }

export function createUser(user) {
  //  console.log("user obj" , user)
  return http.post("api/v1/users/" ,  user)
}