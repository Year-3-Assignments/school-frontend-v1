import { CREATE_SPORT_INVENTORY, GET_ALL_SPORT_INVENTORY, SET_SPORT_INVENTORY, 
  UPDATE_SPORT_INVENTORY, DELETE_SPORT_INVENTORY, GET_SPORT_FOR_SPORT_INVENTORY } from '../actions/index';
  
  const initialState = {
    createsportinventory: '',
    getsportinventory: '',
    updatesportinventory: '',
    deletesportinventory: '',
    setsportinventory: '',
    getallsports: [],
    createsportinventoryError: null,
    getsportinventoryError: null,
    updatesportinventoryError: null,
    deletesportinventoryError: null,
    getallsportsinventoryError: null,
  };
  
  function sportInventoryReducer(state = initialState, action) {
    let createsportinventory, getsportinventory, updatesportinventory, deletesportinventory,
    setsportinventory, getallsports;
  
    switch (action.type) {
      case `${CREATE_SPORT_INVENTORY}_PENDING`:
      case `${GET_ALL_SPORT_INVENTORY}_PENDING`:
      case `${UPDATE_SPORT_INVENTORY}_PENDING`:
      case `${DELETE_SPORT_INVENTORY}_PENDING`:
      case `${SET_SPORT_INVENTORY}_PENDING`:
      case `${GET_SPORT_FOR_SPORT_INVENTORY}_PENDING`:
        return { ...state, loading: true,
          createsportinventoryError: null,
          getsportinventoryError: null,
          updatesportinventoryError: null,
          deletesportinventoryError: null,
          getallsportsinventoryError: null,
        };
      
      case `${CREATE_SPORT_INVENTORY}_FULFILLED`:
        createsportinventory = action.payload.data;
        return { ...state, loading: false, createsportinventory };
      case `${GET_ALL_SPORT_INVENTORY}_FULFILLED`:
        getsportinventory = action.payload.data.data;
        return { ...state, loading: false, getsportinventory }; 
      case `${UPDATE_SPORT_INVENTORY}_FULFILLED`:
        updatesportinventory = action.payload.data.data;
        return { ...state, loading: false, updatesportinventory };
      case `${DELETE_SPORT_INVENTORY}_FULFILLED`:
        deletesportinventory = action.payload.data;
        return { ...state, loading: false, deletesportinventory };
      case `${GET_SPORT_FOR_SPORT_INVENTORY}_FULFILLED`:
        getallsports = action.payload.data.data;
        return { ...state, loading: false, getallsports };
      case `${SET_SPORT_INVENTORY}`:
        setsportinventory = action.payload;
        return { ...state, loading: false, setsportinventory };
           
      case `${CREATE_SPORT_INVENTORY}_REJECTED`:
        return { ...state, loading: false, createsportinventoryError: action.payload.data, state: initialState };
      case `${GET_ALL_SPORT_INVENTORY}_REJECTED`:
        return { ...state, loading: false, getsportinventoryError: action.payload.data, state: initialState };
      case `${UPDATE_SPORT_INVENTORY}_REJECTED`:
        return { ...state, loading: false, updatesportinventoryError: action.payload.data, state: initialState };
      case `${DELETE_SPORT_INVENTORY}_REJECTED`:
        return { ...state, loading: false, deletesportinventoryError: action.payload.data, state: initialState };
      case `${GET_SPORT_FOR_SPORT_INVENTORY}_REJECTED`:
        return { ...state, loading: false, getallsportsinventoryError: action.payload.data, state: initialState };
      
      default: 
        return state;
    }
  }
  
  export default sportInventoryReducer;