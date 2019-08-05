// import getAllWorkorders from "./workOrders";
import http from "./httpService" ;
import qs from "qs"


// const allWorkOrders = getAllWorkorders();

// const users = [
//   {
//     userId: 1,
//     firstName: "dj bog",
//     lastName: "kralj",
//     mail: "dj@gmail.com",
//     password: "12345",
//     region: "California",
//     workOrderIds: [2, 3]
//   },
//   {
//     userId: 2,
//     firstName: "Jao",
//     lastName: "Pakao",
//     mail: "ghdgd@gmail.com",
//     password: "123456789",
//     region: "Denver",
//     workOrderIds: [1, 4]
//   }
// ];

// export function getUserWorkOrders(userId) {
//   let userObj = users.find(e => {
//     return e.userId === userId;
//   });

//   let workOrderList = [];

//   userObj.workOrderIds.forEach(element => {
//     let workOrder = allWorkOrders.filter(order => {
//       return order.id === element;
//     });

//     workOrderList.push(workOrder[0]);
//   });

//   return workOrderList;
// }

export function getUser(id) {
  return http.get(process.env.REACT_APP_API_URL + `/admin/users/${id}`)
}

export function saveUser(user,data) {

  const headers = {
    "Content-Type": "multipart/form-data"
  }
  
  console.log(user);

  if (user._id === "") {
    
    data.append("email" , user.email ) ;
    data.append("password" , user.password ) ;
    data.append("emailPassword" , user.emailPassword ) ;
    data.append("name" , user.name ) ;
    data.append("region" , user.region ) ;
    data.append("status" , "active" ) ;

    return http.post(process.env.REACT_APP_API_URL + `/admin/newUser`, data , {
      headers : headers 
    }
    )
  } 


  data.append("_id" , user._id ) ;
  data.append("email" , user.email ) ;
  data.append("password" , user.password ) ;
  data.append("emailPassword" , user.emailPassword ) ;
  data.append("name" , user.name ) ;
  data.append("region" , user.region ) ;
  data.append("status" , "active" ) ;
  
  
  console.log("prosao gde treba");
  
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/editUser`, data, {
    headers : headers 
  } ) ;
 
}

export function deleteUser(user) { 
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/editUser`, qs.stringify({
    _id : user._id ,
    email: user.email,
    password: user.password,
    emailPassword: user.emailPassword,
    name : user.name,
    region: user.region,
    status : "disabled"
})) ;

}


export function imgUpload(data) { 
   
  console.log("form data" , data);
  data.append("email" , "test2") ; 
  data.append("password" , "test2") ; 
  data.append("emailPassword" , "test2") ; 
  data.append("name" , "test2") ; 
  data.append("region" , "test2") ; 
  data.append("status" , "test2") ; 


  const headers = {
    "Content-Type": "multipart/form-data"
  }
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/imgTest`, data, {
    headers : headers 
  }) ;

}

export default function getAllUsers() {
  return http.get(process.env.REACT_APP_API_URL + "/admin/users")
}
