import * as actionTypes from "./actionTypes";
import { login, getUserAuthCheck } from "../../admin/services/login";

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

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

        loginProps.history.replace("/");

        const { token, role } = res.data;
        dispatch(loginSuccess(token, role));
      })
      .catch(err => {
        dispatch(
          loginFail(err.response.data.error + " " + "Please login again!")
        );
      });
  };
};

const apkRefreshStart = () => {
  return {
    type: actionTypes.APK_REFRESH_START
  };
};

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
        console.log("errrr", err.response);
        dispatch(
          loginFail(err.response.data.error + " " + "Please login again!")
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

  return dispatch =>
    dispatch({
      type: actionTypes.LOGOUT
    });
};

// data:
// expiresIn: "3600"
// message: "Login success."
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlNTI5NDQ5YTk3N2Q0OGU1ZjU4ZGMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NzA3OTk3NzZ9.jRBvfiYRs0IwIEEBxR96Qwv8mE_I1AQWzfzZNME6tk4"
// type: "admin"
// userId: "5d7e529449a977d48e5f58dc"

// err.response.data
// data:
// message: ""email" must be a valid email"
