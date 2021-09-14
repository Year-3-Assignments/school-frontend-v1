import axios from 'axios';
import { GET_ALL_SALARY } from './index';

export function getAllSalary (){
  return {
    type : GET_ALL_SALARY,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/user/salary`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
  }
}