import {
  CREATE_EXAMINATION,
  GET_EXAMINAITONS_FOR_TEACHER,
  UPDATE_EXAMINATION,
  DELETE_EXAMINATION,
  CREATE_QUESTION,
  GET_QUESTIONS_FOR_EXAMINATION,
  GET_QUESTIONS_FOR_TEACHER,
  GET_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SET_EXAMINATION,
} from '../actions';

const INITIALSTATE = {
  createexamination: '',
  getexaminationsforteacher: '',
  updateexamination: '',
  deleteexamination: '',
  createquestion: '',
  getquestionsforexamination: [],
  getquestionsforteacher: [],
  getquestion: '',
  updatequestion: '',
  deletequestion: '',
  setexamination: '',
  createexaminationerror: null,
  getexaminationsforteachererror: null,
  updateexaminationerror: null,
  deleteexaminationerror: null,
  createquestionerror: null,
  getquestionsforexaminationerror: null,
  getquestionsforteachererror: null,
  getquestionerror: null,
  updatequestionerror: null,
  deletequestionerror: null,
};

function examinationReducer(state = INITIALSTATE, action) {
  let createexamination,
    getexaminationsforteacher,
    updateexamination,
    deleteexamination,
    createquestion,
    getquestionsforexamination,
    getquestionsforteacher,
    getquestion,
    updatequestion,
    deletequestion,
    setexamination;

  switch (action.type) {
    case `${CREATE_EXAMINATION}_PENDING`:
    case `${GET_EXAMINAITONS_FOR_TEACHER}_PENDING`:
    case `${UPDATE_EXAMINATION}_PENDING`:
    case `${DELETE_EXAMINATION}_PENDING`:
    case `${CREATE_QUESTION}_PENDING`:
    case `${GET_QUESTIONS_FOR_EXAMINATION}_PENDING`:
    case `${GET_QUESTIONS_FOR_TEACHER}_PENDING`:
    case `${GET_QUESTION}_PENDING`:
    case `${UPDATE_QUESTION}_PENDING`:
    case `${DELETE_QUESTION}_PENDING`:
      return {
        ...state,
        loading: true,
        createexaminationerror: null,
        getexaminationsforteachererror: null,
        updateexaminationerror: null,
        deleteexaminationerror: null,
        createquestionerror: null,
        getquestionsforexaminationerror: null,
        getquestionsforteachererror: null,
        getquestionerror: null,
        updatequestionerror: null,
        deletequestionerror: null,
      };

    case `${CREATE_EXAMINATION}_FULFILLED`:
      createexamination = action.payload.data.data;
      return { ...state, loading: false, createexamination };
    case `${GET_EXAMINAITONS_FOR_TEACHER}_FULFILLED`:
      getexaminationsforteacher = action.payload.data.data;
      return { ...state, loading: false, getexaminationsforteacher };
    case `${UPDATE_EXAMINATION}_FULFILLED`:
      updateexamination = action.payload.data.data;
      return { ...state, loading: false, updateexamination };
    case `${DELETE_EXAMINATION}_FULFILLED`:
      deleteexamination = action.payload.data.data;
      return { ...state, loading: false, deleteexamination };
    case `${CREATE_QUESTION}_FULFILLED`:
      createquestion = action.payload.data.data;
      return { ...state, loading: false, createquestion };
    case `${GET_QUESTIONS_FOR_EXAMINATION}_FULFILLED`:
      getquestionsforexamination = action.payload.data.data;
      return { ...state, loading: false, getquestionsforexamination };
    case `${GET_QUESTIONS_FOR_TEACHER}_FULFILLED`:
      getquestionsforteacher = action.payload.data.data;
      return { ...state, loading: false, getquestionsforteacher };
    case `${GET_QUESTION}_FULFILLED`:
      getquestion = action.payload.data.data;
      return { ...state, loading: false, getquestion };
    case `${UPDATE_QUESTION}_FULFILLED`:
      updatequestion = action.payload.data.data;
      return { ...state, loading: false, updatequestion };
    case `${DELETE_QUESTION}_FULFILLED`:
      deletequestion = action.payload.data.data;
      return { ...state, loading: false, deletequestion };
    case `${SET_EXAMINATION}`:
      setexamination = action.payload;
      return { ...state, loading: false, setexamination };

    case `${CREATE_EXAMINATION}_REJECTED`:
      return {
        ...state,
        loading: false,
        createexaminationerror: action.payload,
        state: INITIALSTATE,
      };
    case `${GET_EXAMINAITONS_FOR_TEACHER}_REJECTED`:
      return {
        ...state,
        loading: false,
        getexaminationsforteachererror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_EXAMINATION}_REJECTED`:
      return {
        ...state,
        loading: false,
        updateexaminationerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${DELETE_EXAMINATION}_REJECTED`:
      return {
        ...state,
        loading: false,
        deleteexaminationerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${CREATE_QUESTION}_REJECTED`:
      return {
        ...state,
        loading: false,
        createquestionerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_QUESTIONS_FOR_EXAMINATION}_REJECTED`:
      return {
        ...state,
        loading: false,
        getquestionsforexaminationerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_QUESTIONS_FOR_TEACHER}_REJECTED`:
      return {
        ...state,
        loading: false,
        getquestionsforteachererror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${GET_QUESTION}_REJECTED`:
      return {
        ...state,
        loading: false,
        getquestionerror: action.payload.data,
        state: INITIALSTATE,
      };
    case `${UPDATE_QUESTION}_REJECTED`:
      return {
        ...state,
        loading: false,
        updatequestionerror: action.payload,
        state: INITIALSTATE,
      };
    case `${DELETE_QUESTION}_REJECTED`:
      return {
        ...state,
        loading: false,
        deletequestionerror: action.payload.data,
        state: INITIALSTATE,
      };

    default:
      return state;
  }
}

export default examinationReducer;
