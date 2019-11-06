import React, { Component } from 'react'
import { toast } from "react-toastify"

import { getVendor , createVendor, editVendor, deleteVendor } from "../../services/vendors"

import styles from "./Vendor.module.css"

import Spinner from "../../components/Ui/Spinner/Spinner";
import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin";
import VendorForm from "../../components/Vendors/Vendor/VendorForm" ;


export class Vendor extends Component {
  state = {
    load : false ,
    newVendor : false ,
    errorMsgs : [],
    vendorReports : null , 
    btnDisable : false ,
    vendor : {
      company : "" ,
      contact : "" ,
      function : "" ,
      phoneNumber : "" ,
      phoneNumber2 : "" ,
      email : ""
 
    }
  }

async componentDidMount() {
  let vendorId = this.props.match.params.id; 
  if (vendorId === "new") {
    this.setState((state, props) => ({
      load : true ,
      newVendor : true
    }))

    return ;
  }

  try {
   const  { data } = await getVendor(vendorId)
   const vendor = data.data ;  
   this.setState((state, props) => ({
    load : true ,
    vendor : vendor, 
    vendorReports : vendor.reports 
  })) 

  } catch (error) {
    if (error.response.data.error) {
      toast.error(error.response.data.error )
     } else {
      toast.error(error.response.statusText )
     }
  }

}

handleInputChange = (e) => {
  let vendorCopy = {...this.state.vendor} 
  vendorCopy[e.target.name]  = e.target.value ;
  this.setState((state, props) => ({
    vendor : vendorCopy
  }))
}

//// vednor form validation 
vaidate = (vendor) => {
  let errorMsgs = [];

  if (!vendor.company.trim()) {
    errorMsgs.push("Company name can't be empty");
  }

  if (!vendor.email.trim()) {
    errorMsgs.push("Email can't be empty");
  }
   
  ////// reg expresion for email check Svarc 
  if (vendor.email) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!pattern.test(vendor.email)) {
      errorMsgs.push("Please enter a valid Email");
    }
  }

  this.setState({
    errorMsgs: errorMsgs
  });

  if (errorMsgs.length === 0) {
    return true;
  } else {
    return false;
  }  
   

}


//// submiting the form 
handleSubmit = async (e, vendorId) => {
  e.preventDefault();
  const vendor = {...this.state.vendor}
  vendor.function = this.firstLetherToUperCase(vendor.function)
  let validate = this.vaidate(vendor) ;
  
  if (validate) {
     //// create new vendor 
     if (!vendorId) {
       try {
         await createVendor(vendor) ;
         toast.success("Vendor Created!")
         this.setState({
          btnDisable : true 
         })
       } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error)
         } else {
          toast.error(error.response.statusText + " Login again!")
         }
       }
     }

     /// edit current vendor 
     if (vendorId) {
      try {
        await editVendor(vendor, vendorId) ;
        toast.success("Vendor Update Success!")
        this.setState({
         btnDisable : true 
        })
      } catch (error) {
       if (error.response.data.error) {
         toast.error(error.response.data.error)
        } else {
         toast.error(error.response.statusText + " Login again!")
        }
      }
     }


  } else {
    return ;
  }
}

handleDelete = async (id) => {
   let yesOrNo = window.confirm("Delete this vendor ?")
   if (!yesOrNo) {
     return ;
   }

   try {
     await deleteVendor(id) ;
     toast.success("Vendor Successfully Deleted");
     this.setState({
      btnDisable : true 
     })
   } catch (error) {
    if (error.response.data.error) {
      toast.error(error.response.data.error)
     } else {
      toast.error(error.response.statusText + " Login again!")
     }
   }
}


   
handleBack =() => {
  this.props.history.goBack();
}

 
///// helper methods 
 firstLetherToUperCase = (str) => {
  if (str) {
    const strToLoverCase = str.toLowerCase()
    const strCapitalized = strToLoverCase.charAt(0).toUpperCase() + strToLoverCase.slice(1)
    return strCapitalized ;
  } 
}

  render() {
     let vendor = null ;
     if (!this.state.load) {
       vendor = <Spinner />
     } else {

       vendor = (
        <VendorForm 
         onDeleteVendor={this.handleDelete}
         onBack={this.handleBack}
         onSubmit={this.handleSubmit}
         inputChange={this.handleInputChange}
         newVendor={this.state.newVendor} 
         vendor={this.state.vendor}
         errorMsgs={this.state.errorMsgs}
         btnDisable={this.state.btnDisable}
         
        />
       )

     }




    return (
    <PageNameAdmin pageName={this.props.location.state.name}>
      {vendor}
    </PageNameAdmin>
    )
  }
}

export default Vendor



// {
//   "success": true,
//   "data": {
//       "_id": "5db9f67cdaec987fea3faad9",
//       "function": "Water",
//       "contact": "",
//       "company": "City of Oxnard",
//       "phoneNumber": "(805) 385-8136",
//       "phoneNumber2": "",
//       "email": "",
//       "reports": [
//           {
//               "startDate": "2019-11-19T23:00:00.000Z",
//               "endDate": null,
//               "_id": "5dbddaf14c9e01121c0c0335",
//               "report": {
//                   "floor": {
//                       "answer": "Yes",
//                       "comment": "this is comment about floor. It needs realy big update.. this isn't suitable for mormal living. Please do what you can to fix it as quckly as posible! "
//                   },
//                   "paint": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "windows": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "blinds": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "cleaning": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "re-glazed": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "pest cont": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "stove": {
//                       "20": false,
//                       "24": false,
//                       "30": false,
//                       "gas": true,
//                       "electric": true,
//                       "white": false,
//                       "stainless": false
//                   },
//                   "microwave": {
//                       "white": true,
//                       "stainless": false
//                   },
//                   "dishwasher": {
//                       "standard": false,
//                       "small": false,
//                       "white": false,
//                       "stainless": false
//                   },
//                   "refrigerator": {
//                       "standard": false,
//                       "small": false,
//                       "white": false,
//                       "stainless": false
//                   },
//                   "A/C": {
//                       "8000": false,
//                       "10000": false,
//                       "12000": false,
//                       "rear vent": false,
//                       "standard": false,
//                       "A/C heater": false
//                   },
//                   "vendors": [
//                       "5db9f67cdaec987fea3faa96",
//                       "5db9f67cdaec987fea3faab4",
//                       "5db9f67cdaec987fea3faad9",
//                       "5db9f67cdaec987fea3faa97",
//                       "5db9f67cdaec987fea3faaa8"
//                   ],
//                   "jobs": [
//                       "5db75054c188d357846d100c",
//                       "5db97590d4fa2954c848d02c",
//                       "5db975a2d4fa2954c848d02d"
//                   ],
//                   "startedTime": "2019-10-23T16:29:33.158Z",
//                   "completedTime": "2019-10-23T16:29:33.158Z",
//                   "sentTime": "2019-10-23T16:29:33.158Z",
//                   "totalPrice": 5,
//                   "adminStatus": "pending",
//                   "userStatus": "pending",
//                   "level": 3,
//                   "squareFootage": "654",
//                   "lockBoxCode": "134324i",
//                   "_id": "5db74ff3c188d357846d1009",
//                   "reportComment": "this is comment about report",
//                   "roomComments": [
//                       {
//                           "_id": "5db74ff3c188d357846d100a",
//                           "roomName": "Entrance",
//                           "comment": "this is comment about entrance"
//                       }
//                   ],
//                   "buildingCode": 3,
//                   "address": "Green aveny",
//                   "unit": "14-02",
//                   "user": "5dae1506939a39747f6b2224",
//                   "createdAt": "2019-10-28T20:30:43.169Z",
//                   "updatedAt": "2019-11-02T19:37:20.824Z",
//                   "__v": 3
//               }
//           },
//           {
//               "startDate": null,
//               "endDate": "2019-11-18T23:00:00.000Z",
//               "_id": "5dc050aeea7686174497235e",
//               "report": {
//                   "floor": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "paint": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "windows": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "blinds": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "cleaning": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "re-glazed": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "pest cont": {
//                       "answer": "",
//                       "comment": ""
//                   },
//                   "stove": {
//                       "20": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "24": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "30": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "gas": {
//                           "category": "type",
//                           "checked": false
//                       },
//                       "electric": {
//                           "category": "type",
//                           "checked": false
//                       },
//                       "white": {
//                           "category": "color",
//                           "checked": false
//                       },
//                       "stainless": {
//                           "category": "color",
//                           "checked": false
//                       }
//                   },
//                   "microwave": {
//                       "white": {
//                           "category": "color",
//                           "checked": false
//                       },
//                       "stainless": {
//                           "category": "color",
//                           "checked": false
//                       }
//                   },
//                   "dishwasher": {
//                       "standard": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "small": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "white": {
//                           "category": "color",
//                           "checked": false
//                       },
//                       "stainless": {
//                           "category": "color",
//                           "checked": false
//                       }
//                   },
//                   "refrigerator": {
//                       "standard": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "small": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "white": {
//                           "category": "color",
//                           "checked": false
//                       },
//                       "stainless": {
//                           "category": "color",
//                           "checked": false
//                       }
//                   },
//                   "A/C": {
//                       "8000": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "10000": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "12000": {
//                           "category": "size",
//                           "checked": false
//                       },
//                       "rear vent": {
//                           "category": "type",
//                           "checked": false
//                       },
//                       "standard": {
//                           "category": "type",
//                           "checked": false
//                       },
//                       "A/C heater": {
//                           "category": "type",
//                           "checked": false
//                       }
//                   },
//                   "vendors": [],
//                   "jobs": [
//                       "5db21ef66d65ca2663025773"
//                   ],
//                   "startedTime": "2019-10-23T16:29:33.158Z",
//                   "completedTime": "2019-10-23T16:29:33.158Z",
//                   "sentTime": "2019-10-23T16:29:33.158Z",
//                   "totalPrice": null,
//                   "adminStatus": "finished",
//                   "userStatus": "pending",
//                   "level": 3,
//                   "squareFootage": "654",
//                   "lockBoxCode": "134324i",
//                   "_id": "5dbf26710133c00580719c52",
//                   "reportComment": "this is comment about report",
//                   "roomComments": [
//                       {
//                           "_id": "5db08100b798cb240446d4ec",
//                           "roomName": "Entrance",
//                           "comment": "this is comment about entrance"
//                       }
//                   ],
//                   "buildingCode": 3,
//                   "address": "Green aveny",
//                   "unit": "14-02",
//                   "user": "5db2f1ca2642d4433cf611a3",
//                   "createdAt": "2019-11-03T19:11:45.821Z",
//                   "updatedAt": "2019-11-04T16:24:31.882Z",
//                   "__v": 0
//               }
//           }
//       ],
//       "createdAt": "2019-10-30T20:45:48.947Z",
//       "updatedAt": "2019-11-04T16:24:14.870Z",
//       "__v": 7
//   }
// }