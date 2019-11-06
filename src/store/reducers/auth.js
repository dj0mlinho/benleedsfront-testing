import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userLoged: false,
  adminLoged: false,
  loading: true,
  userId: null,
  error: null,
  type: null,
  logout : false 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.APK_REFRESH_SUCCESS:
      return {
        ...state,
        type: action.userType
      };

    case actionTypes.LOADING_END:
      return {
        ...state,
        loading: false
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        type: action.userT,
        // userId: action.userId
      };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default reducer;
