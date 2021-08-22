import axios from 'axios';
import { CREATE_EMPLOYEE_ACCOUNT, GET_ALL_EMPLOYEE_LIST, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './index';

export function createEmployee(employee) {
  return {
    type: CREATE_EMPLOYEE_ACCOUNT,
    payload: axios.post(`${process.env.REACT_APP_API_DEV_URL}/user/create/`, employee)
  };
}

export function getEmployeeList() {
  return {
    type: GET_ALL_EMPLOYEE_LIST,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/user/getAllEmployees`)
  };
}

export function deleteEmployee(employee) {
  return {
    type: DELETE_EMPLOYEE,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/user/delete/${employee.id}`,
    employee,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  }
}

export function updateEmployee(employee) {
  return{
    type: UPDATE_EMPLOYEE,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/user/update/${employee.id}`,
      employee,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    )
  }
}
