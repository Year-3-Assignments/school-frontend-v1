import { GET_ALL_SALARY } from '../actions';

const initialState = {
  salaryList: [],
  salaryListError: null,
};

function salaryReducer(state = initialState, action) {
  let salaryList;

  switch (action.type) {
    case `${GET_ALL_SALARY}_PENDING`:
      return {
        ...state,
        loading: true,
        salaryListError: null,
      };

      case `${GET_ALL_SALARY}_FULFILLED`:
        salaryList = action.payload.data;
        return {
          ...state,
          loading: false,
          salaryList,
        };

        case `${GET_ALL_SALARY}_REJECTED`:
          return {
            ...state,
            loading: false,
            salaryListError: action.payload,
            state: initialState,
          };

          default:
            return state;
  }
}
export default salaryReducer;