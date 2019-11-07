import * as actionTypes from "./actionTypes";
import { login, getUserAuthCheck } from "../../admin/services/login";
// import { HashRouter } from "react-router-dom"

// const loginStart = () => {
//   return {
//     type: actionTypes.LOGIN_START
//   };
// };

const loginSuccess = (token, role) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userT: role
  };
};

const loginFail = err => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: err
  };
};
export const loginInit = (email, password, loginProps) => {
  return dispatch => {
    // dispatch(loginStart()) ;

    let loginObj = { email: email, password: password };
    login(loginObj)
      .then(res => {
        // console.log("res", res);
        // console.log("loginProps", loginProps);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loginTime", new Date().getTime());
       
        //// push to every rout that you want !!!
        loginProps.history.replace("/");

        const { token, role } = res.data;
        dispatch(loginSuccess(token, role));
      })
      .catch(err => {
          let errorMsg = null ;
           if (err.response.data.error) {
           errorMsg = (err.response.data.error + " Login again!")
          } else {
           errorMsg =(err.response.statusText + " Login again!")
           }

        dispatch(
          loginFail(errorMsg)
        );
      });
  };
};

// const apkRefreshStart = () => {
//   return {
//     type: actionTypes.APK_REFRESH_START
//   };
// };

const apkRefreshSuccess = userType => {
  return {
    type: actionTypes.APK_REFRESH_SUCCESS,
    userType: userType
  };
};

export const refreshInit = token => {
  return dispatch => {
    getUserAuthCheck(token)
      .then(res => {
        dispatch(apkRefreshSuccess(res.data.data.role));
        dispatch(loadingEnd());
      })
      .catch(err => {
        // console.log("errrr", err.response);
        let errorMsg = null ;
        if (err.response.data.error) {
        errorMsg = (err.response.data.error + " Login again!")
       } else {
        errorMsg =(err.response.statusText + " Login again!")
        }

        dispatch(
          loginFail(errorMsg)
        );
        localStorage.removeItem("token");

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  };
};

export const loadingEnd = () => {
  return {
    type: actionTypes.LOADING_END
  };
};

export const logout = () => {
   
  localStorage.removeItem("token");
  window.location.reload(); 
  
  // return dispatch => {
  //   dispatch({
  //     type: actionTypes.LOGOUT
  //   });
  //   localStorage.removeItem("token");
  //   window.location.reload(); 
  // }
    
};



