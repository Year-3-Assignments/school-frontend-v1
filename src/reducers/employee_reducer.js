import {
    CREATE_EMPLOYEE_ACCOUNT,
    GET_ALL_EMPLOYEE_LIST,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    SET_EMPLOYEE
  } from '../actions';
  
  const initialState = {
    createemployee: '',
    employeeList: [],
    deleteEmployee: '',
    updateEmployee: '',
    setEmployee:'',
    createemployeeError: null,
    employeeListError: null,
    deleteemployeeError: null,
    updateemployeeError: null,
  };
  
  function employeeReducer(state = initialState, action) {
    let createemployee, employeeList, deleteEmployee, updateEmployee, setEmployee;
  
    switch (action.type) {
      case `${CREATE_EMPLOYEE_ACCOUNT}_PENDING`:
        return {
          ...state,
          loading: true,
          createemployeeError: null,
        };
      case `${GET_ALL_EMPLOYEE_LIST}_PENDING`:
        return {
          ...state,
          loading: true,
          employeeListError: null,
        };
      case `${DELETE_EMPLOYEE}_PENDING`:
        return {
          ...state,
          loading: true,
          deleteemployeeError: null,
        };
      case `${UPDATE_EMPLOYEE}_PENDING`:
        return {
          ...state,
          loading: true,
          updateemployeeError: null,
        };
  
      case `${CREATE_EMPLOYEE_ACCOUNT}_FULFILLED`:
        createemployee = action.payload.data;
        return { ...state, loading: false, createemployee };
      case `${GET_ALL_EMPLOYEE_LIST}_FULFILLED`:
        employeeList = action.payload.data;
        return {
          ...state,
          loading: false,
          employeeList,
        };
      case `${DELETE_EMPLOYEE}_FULFILLED`:
        deleteEmployee = action.payload.data;
        return {
          ...state,
          loading: false,
          deleteEmployee,
        };
      case `${UPDATE_EMPLOYEE}_FULFILLED`:
        updateEmployee = action.payload.data;
        return {
          ...state,
          loading: false,
          updateEmployee,
        };
      case `${SET_EMPLOYEE}`:
        setEmployee = action.payload;
        console.log(action.payload);
        return { ...state, loading: false, setEmployee 
        };
      
      case `${CREATE_EMPLOYEE_ACCOUNT}_REJECTED`:
        return {
          ...state,
          loading: false,
          createemployeeError: action.payload,
          state: initialState,
        };
      case `${GET_ALL_EMPLOYEE_LIST}_REJECTED`:
        return {
          ...state,
          loading: false,
          employeeListError: action.payload,
          state: initialState,
        };
      case `${deleteEmployee}_REJECTED`:
        return {
          ...state,
          loading: false,
          deleteemployeeError: action.payload,
          state: initialState,
        };
      case `${updateEmployee}_REJECTED`:
        return {
          ...state,
          loading: false,
          updateemployeeError: action.payload,
          state: initialState,
        };
  
      default:
        return state;
    }
  }
  
  export default employeeReducer;