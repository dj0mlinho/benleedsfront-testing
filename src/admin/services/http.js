import axios from "axios" ;
import {toast} from "react-toastify" ;

const http = axios.create({
	// baseURL: process.env.API_URL + '/',
	headers: {	
		'Content-Type': 'application/json',		
	}
})

http.interceptors.request.use(function(config){
  config.headers.common['Authorization'] = 'Bearer ' + fechToken()
  return config
 } , error => {
  return Promise.reject(error);
});


////// hvatamo na globalnom nivo unexpected errore u responsu !!!!
http.interceptors.response.use(null, error => {
  const exepError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  
  console.log("interceptor error" , error.response)  

  if (!exepError) {
    console.log("loging error", error);
    toast.error("An unexpected error acured");
  }

  return Promise.reject(error);
});

function fechToken() {
  let token = localStorage.getItem("token") ;
  return token ;
}

export default  http ; 