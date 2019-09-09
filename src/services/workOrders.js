import http from "./httpService" ;
import qs from "qs"

  

export default function  getAllWorkorders(){
    return http.get(process.env.REACT_APP_API_URL + "/admin")
}

export function getWorkOrder(workOrderId){
  return http.get(process.env.REACT_APP_API_URL + `/admin/workorders/${workOrderId}`);
} 

export function endJob(jobId){
  let d = new Date();
  let finishedDate = d.toLocaleString();
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/finishJob/${jobId}`, 
   qs.stringify({
     status : "finished" ,
     finishedDate : finishedDate
   })
   );
} 


export function assignJob(jobId, job, vendor, workorder, allJobs){

  // console.log( "jobid as" , jobId);
  // console.log( "wo as" , workorder);
  // console.log( "job as" , job);
  // console.log( "jvendor as" , vendor);
  // console.log( "all jobs" , allJobs);
  // console.log("date" , typeof job.assignmentDate);
  // console.log("date" , job.assignmentDate);


  let woStatusInfo = allJobs.filter(
    jobS => (jobS.status === "pending") 
  ) ;
  
  
   

 
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/assignJob/${jobId}` ,
  JSON.stringify({   
      job : {
         _id : job._id ,
         status : "sent" ,
         name : job.name ,
         subCategory : job.subCategory ,  
         room : job.room ,
         price : job.price ,  
         quantity : job.quantity ,
         comment : job.comment,
         workorderId : job.workorderId,
         vendorId : job.vendorId,
         assignmentDate : job.assignmentDate,
         endDate : job.endDate 
      },
      vendor : {
         _id : vendor._id ,
         name : vendor.name ,
         email : vendor.email ,
         profession : vendor.profession,
         status : vendor.status  
       },
      workorder : {
        _id : workorder._id ,
        status : (woStatusInfo.length === 1 || woStatusInfo.length === 0  ) ? "sent" : workorder.status,
        buildingNumber : workorder.buildingNumber,
        apartmentNumber : workorder.apartmentNumber,
        adress : workorder.adress,
        comment :  workorder.comment
      } 

    })
   
  )

}

