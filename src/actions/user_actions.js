import { USER_LOGIN } from './index';
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
