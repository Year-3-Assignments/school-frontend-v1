import {
  CREATE_STUDENT,
  DELETE_STUDENT,
  GET_ALL_STUDENTS,
  GET_STUDENT,
  UPDATE_STUDENT,
  SET_STUDENT,
} from '../actions';

const INITIALSTATE = {
  createstudent: '',
  getallstudents: ' ',
  getstudent: [],
  updatestudent: '',
  deletestudent: '',
  setstudent: '',
  createstudenterror: null,
  getallstudentserror: null,
  getstudenterror: null,
  updatestudenterror: null,
  deletestudenterror: null,
};

function studentReducer(state = INITIALSTATE, action) {
  let createstudent,
    getallstudents,
    getstudent,
    setstudent,
    updatestudent,
    deletestudent;

  switch (action.type) {
    case `${CREATE_STUDENT}_PENDING`:
    case `${GET_ALL_STUDENTS}_PENDING`:
    case `${GET_STUDENT}_PENDING`:
    case `${UPDATE_STUDENT}_PENDING`:
    case `${DELETE_STUDENT}_PENDING`:
      return {
        ...state,
        loading: true,
        createstudenterror: null,
        getallstudentserror: null,
        getstudenterror: null,
        updatestudenterror: null,
        deletestudenterror: null,
      };
    case `${CREATE_STUDENT}_FULFILLED`:
      createstudent = action.payload.data.data;
      return { ...state, loading: false, createstudent };
    case `${GET_ALL_STUDENTS}_FULFILLED`:
      getallstudents = action.payload.data.data;
      return { ...state, loading: false, getallstudents };
    case `${GET_STUDENT}_FULFILLED`:
      getstudent = action.payload.data.data;
      return { ...state, loading: false, getstudent };
    case `${UPDATE_STUDENT}_FULFILLED`:
      updatestudent = action.payload.data.data;
      return { ...state, loading: false, updatestudent };
    case `${DELETE_STUDENT}_FULFILLED`:
      deletestudent = action.payload.data.data;
      return { ...state, loading: false, deletestudent };
    case `${SET_STUDENT}`:
      setstudent = action.payload;
      return { ...state, loading: false, setstudent };

    case `${CREATE_STUDENT}_REJECTED`:
      return {
        ...state,
        loading: false,
        createstudenterror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_ALL_STUDENTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        getallstudentserror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_STUDENT}_REJECTED`:
      return {
        ...state,
        loading: false,
        getstudenterror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_STUDENT}_REJECTED`:
      return {
        ...state,
        loading: false,
        updatestudenterror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${DELETE_STUDENT}_REJECTED`:
      return {
        ...state,
        loading: false,
        deletestudenterror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default studentReducer;
