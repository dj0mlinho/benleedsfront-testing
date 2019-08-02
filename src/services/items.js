import http from "./httpService" ;
import qs from "qs"

export function getRooms() {
  return http.get(process.env.REACT_APP_API_URL + `/admin/newItem`)
}

export function getItemsFromRoom(name) {
  if (name === "Items for all rooms" || name === "extra" ) {
    return http.get(process.env.REACT_APP_API_URL + `/admin/extraItems`)
  } 
  return http.get(process.env.REACT_APP_API_URL + `/admin/rooms/${name}`)
}


//// na isti path ce ici oba 
//// room livingroom kada sejvujem one koji nemaju sobu, i drugi status za njih
export function saveNewItem(item) {
 
  if (item.room === "extra") {
     
    return http.post(process.env.REACT_APP_API_URL + "/admin/newItem" , qs.stringify({
      status : "extra" ,
      name : item.name ,
      subCategory : item.subCategory,
      room : "" ,
      price : item.price,
      link : item.link
  }) ) ;
  }
  
  return http.post(process.env.REACT_APP_API_URL + "/admin/newItem" , qs.stringify({
      status : "regular" ,
      name : item.name ,
      subCategory : item.subCategory,
      room : item.room ,
      price : item.price,
      link : item.link
  }) ) ;
}

export function deleteItem(item){
  
  console.log("item za delete",item);
  
  
  if (item.status === "regular") {
    return http.post(process.env.REACT_APP_API_URL + `/admin/deleteItem` , qs.stringify({
      status : "regular" ,
      name : item.name ,
      subCategory : item.subCategory,
      room : item.room ,
      price : item.price,
      link : item.link
  })
  )

  } else {
     
    console.log("usao u extra");

    return http.post(process.env.REACT_APP_API_URL + `/admin/deleteItem` , qs.stringify({
      status : "extra" ,
      name : item.name ,
      subCategory : item.subCategory,
      room : "" ,
      price : item.price,
      link : item.link
  })
  )

  } 

 


}

// export function deleteExtraItem(){

//   const item = {
//     room : "Entrance" ,
//     subCategory : "Appliances: Stove" ,  
//     name : "Flex" ,
//     price : "49.5" ,
//     link : "" 
//   } ;

//   console.log("usao u funkciju");
  

//   return http.post(process.env.REACT_APP_API_URL + `/admin/deleteItem` , qs.stringify({
//     status : "extra" ,
//     name : item.name ,
//     subCategory : item.subCategory,
//     room : item.room ,
//     price : item.price,
//     link : item.link
// })
// )
// }


export function editItem(itemOrg, itemEdited) {
  console.log("org item" , itemOrg);
  console.log("edit item" , itemEdited);
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/editItem` , JSON.stringify({
     
    old : {
      _id : itemOrg._id ,
      name : itemOrg.name ,
      subCategory : itemOrg.subCategory,
      room : itemOrg.room || "" ,
      price : itemOrg.price,
      link : itemOrg.link,
      status : itemOrg.status
    } ,
    new : {
      _id : itemEdited._id ,
      name : itemEdited.name ,
      subCategory : itemEdited.subCategory,
      room : itemEdited.room  || "" ,
      price : itemEdited.price,
      link : itemEdited.link,
      status : itemEdited.status
    }

     
  }) ) ;
}


// export function editItem(item) {
//   console.log("item link" , item.link );
  
//   //// dodati status 

//   return http.post(process.env.REACT_APP_API_URL + `/admin/editItem/${item._id}` , qs.stringify({
//       name : item.name ,
//       subCategory : item.subCategory,
//       room : item.room ,
//       price : item.price,
//       link : item.link
//   }) ) ;
// }





