import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    tokenId: action.tokenId,
    userId: action.userId,
    loading: false
  };
};

const authFailed = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    tokenId: null,
    userId: null
  };
};

const setAuthRedirectPAth = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPAth(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
