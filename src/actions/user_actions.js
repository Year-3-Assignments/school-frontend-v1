import { USER_LOGIN, GET_USER_PROFILE } from './index';
import axios from 'axios';

export function loginUser(loginData) {
  return {
    type: USER_LOGIN,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/user/login/`,
      loginData
    ),
  };
}

export function getUserInfo() {
  return {
    type: GET_USER_PROFILE,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/user/`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
  };
}
