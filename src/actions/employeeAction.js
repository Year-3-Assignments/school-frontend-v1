import axios from 'axios';
import {
  CREATE_EMPLOYEE_ACCOUNT,
  GET_ALL_EMPLOYEE_LIST,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_EMPLOYEE,
  GET_EMPLOYEE,
} from './index';

export function setEmployee(employeeData) {
  return {
    type: SET_EMPLOYEE,
    payload: employeeData,
  };
}

export function createEmployee(employee) {
  return {
    type: CREATE_EMPLOYEE_ACCOUNT,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/user/create/`,
      employee
    ),
  };
}

export function getEmployeeById(employeeId) {
  return{
    type : GET_EMPLOYEE,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/user/${employeeId}`,
      {headers: {Authorization:localStorage.getItem('token') } }
    )
  }
}

export function getEmployeeList() {
  return {
    type: GET_ALL_EMPLOYEE_LIST,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/user/getAllEmployees`
    ),
  };
}

export function deleteEmployee(employeeData) {
  return {
    type: DELETE_EMPLOYEE,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/user/delete/${employeeData}`,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  };
}

export function updateEmployee(employee) {
  return {
    type: UPDATE_EMPLOYEE,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/user/update/${employee._id}`,
      employee,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  };
}