import { CREATE_SPORT, GET_ALL_SPORT, GET_SPORT_FOR_SPORT_INVENTORY, SET_SPORT, GET_SPORT, 
  GET_COACH_FOR_SPORT, GET_STUDENT_FOR_SPORT, UPDATE_SPORT, DELETE_SPORT } from '../actions/index';
  
  const initialState = {
    createsport: '',
    getsport: '',
    updatesport: '',
    deletesport: '',
    setsport: '',
    getallsports: [],
    getallcoaches: [],
    getallstudents: [],
    createsportError: null,
    getsportError: null,
    updatesportError: null,
    deletesportError: null,
    getallsportsError: null,
    getallcoachesError: null,
    getallstudentsError: null,
  };
  
  function sportReducer(state = initialState, action) {
    let createsport, getsport, updatesport, deletesport, getallsports, 
      getallcoaches, getallstudents, setsport;
  
    switch (action.type) {
      case `${CREATE_SPORT}_PENDING`:
      case `${GET_SPORT}_PENDING`:
      case `${UPDATE_SPORT}_PENDING`:
      case `${DELETE_SPORT}_PENDING`:
      case `${GET_ALL_SPORT}_PENDING`:
      case `${GET_SPORT_FOR_SPORT_INVENTORY}_PENDING`:
      case `${GET_COACH_FOR_SPORT}_PENDING`:
      case `${GET_STUDENT_FOR_SPORT}_PENDING`:
        return { ...state, loading: true,
          createsportError: null,
          getsportError: null,
          updatesportError: null,
          deletesportError: null,
          getallsportsError: null,
          getallcoachesError: null,
          getallstudentsError: null,
        };
      
      case `${CREATE_SPORT}_FULFILLED`:
        createsport = action.payload.data;
        return { ...state, loading: false, createsport };
      case `${GET_SPORT}_FULFILLED`:
        getsport = action.payload.data;
        return { ...state, loading: false, getsport }; 
      case `${UPDATE_SPORT}_FULFILLED`:
        updatesport = action.payload.data.data;
        return { ...state, loading: false, updatesport };
      case `${DELETE_SPORT}_FULFILLED`:
        deletesport = action.payload.data;
        return { ...state, loading: false, deletesport };
      case `${GET_ALL_SPORT}_FULFILLED`:
        getallsports = action.payload.data.data;
        return { ...state, loading: false, getallsports };
      // case `${GET_SPORT_FOR_SPORT_INVENTORY}_FULFILLED`:
      //   getSportForSportInventory = action.payload.data;
      //   return { ...state, loading: false, getSportForSportInventory };
      case `${GET_COACH_FOR_SPORT}_FULFILLED`:
        getallcoaches = action.payload.data.data;
        return { ...state, loading: false, getallcoaches };
      case `${GET_STUDENT_FOR_SPORT}_FULFILLED`:
        getallstudents = action.payload.data.data;
        return { ...state, loading: false, getallstudents };
      case `${SET_SPORT}`:
        setsport = action.payload;
        return { ...state, loading: false, setsport };
           
      case `${CREATE_SPORT}_REJECTED`:
        return { ...state, loading: false, createsportError: action.payload.data, state: initialState };
      case `${GET_SPORT}_REJECTED`:
        return { ...state, loading: false, getsportError: action.payload.data, state: initialState };
      case `${UPDATE_SPORT}_REJECTED`:
        return { ...state, loading: false, updatesportError: action.payload.data, state: initialState };
      case `${DELETE_SPORT}_REJECTED`:
        return { ...state, loading: false, deletesportError: action.payload.data, state: initialState };
      case `${GET_ALL_SPORT}_REJECTED`:
        return { ...state, loading: false, getallsportsError: action.payload.data, state: initialState };
      // case `${GET_SPORT_FOR_SPORT_INVENTORY}_REJECTED`:
      //   return { ...state, loading: false, getallcoachesError: action.payload.data, state: initialState };
      case `${GET_COACH_FOR_SPORT}_REJECTED`:
        return { ...state, loading: false, getallcoachesError: action.payload.data, state: initialState };
      case `${GET_STUDENT_FOR_SPORT}_REJECTED`:
        return { ...state, loading: false, getallstudentsError: action.payload.data, state: initialState };
      
      default: 
        return state;
    }
  }
  
  export default sportReducer;