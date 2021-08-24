import { USER_LOGIN } from '../actions';

const initialState = {
  loginUser: '',
  loginUserError: null,
};

function userReducer(state = initialState, action) {
  let loginUser;

  switch (action.type) {
    case `${USER_LOGIN}_PENDING`:
      return { ...state, loading: false, loginUserError: null };

    case `${USER_LOGIN}_FULFILLED`:
      loginUser = action.payload.data;
      return { ...state, loading: false, loginUser };

    case `${USER_LOGIN}_REJECTED`:
      return {
        ...state,
        loading: false,
        loginUserError: action.payload,
        initialState,
      };

    default:
      return state;
  }
}

export default userReducer;
