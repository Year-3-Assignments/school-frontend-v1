import { USER_LOGIN, GET_USER_PROFILE } from '../actions';

const initialState = {
  loginUser: '',
  loginUserError: null,
  getUserInfo: '',
  getUserInfoError: null,
};

function userReducer(state = initialState, action) {
  let loginUser, getUserInfo;

  switch (action.type) {
    case `${USER_LOGIN}_PENDING`:
    case `${GET_USER_PROFILE}_PENDING`:
      return {
        ...state,
        loading: false,
        loginUserError: null,
        getUserInfoError: null,
      };

    case `${USER_LOGIN}_FULFILLED`:
      loginUser = action.payload.data;
      return { ...state, loading: false, loginUser };

    case `${GET_USER_PROFILE}_FULFILLED`:
      getUserInfo = action.payload.data.data;
      return { ...state, loading: false, getUserInfo };

    case `${USER_LOGIN}_REJECTED`:
      return {
        ...state,
        loading: false,
        loginUserError: action.payload,
        initialState,
      };

    case `${GET_USER_PROFILE}_REJECTED`:
      return {
        ...state,
        loading: false,
        getUserInfoError: action.payload,
        initialState,
      };

    default:
      return state;
  }
}

export default userReducer;
