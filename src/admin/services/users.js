import http from "../services/http" ;


export function getUser(id) {
  return http.get("http://localhost:8080/api/v1/users/" + id )

}

export function deleteUser(id) {
  // console.log("delete id" , id);
  
  return http.delete("http://localhost:8080/api/v1/users/" + id )

}

export function editUser(user, id) {
  return http.put("http://localhost:8080/api/v1/users/" + id , user)

}

export function getAllUsers() {
  return http.get("http://localhost:8080/api/v1/users?role=user&status=active" )
}

//  user = {
// 	"name":"Yoana",
// 	"email":"yoana@benleedsapp.com",
// 	"region":"West LA",
// 	"password":"123"
// }

export function createUser(user) {
  //  console.log("user obj" , user)
  return http.post("http://localhost:8080/api/v1/users/" ,  user)
}