import axios from 'axios';
import {
  CREATE_STUDENT,
  DELETE_STUDENT,
  GET_ALL_STUDENTS,
  GET_STUDENT,
  SET_STUDENT,
  UPDATE_STUDENT,
} from './index';

export function setStudent(studentData) {
  return {
    type: SET_STUDENT,
    payload: studentData,
  };
}
export function createStudent(studentData) {
  return {
    type: CREATE_STUDENT,
    payload: axios.post(
      `${process.env.REACT_APP_API_DEV_URL}/student/add/`,
      studentData,
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    ),
  };
}

export function getAllStudents() {
  return {
    type: GET_ALL_STUDENTS,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/student/`, {
      headers: { Authorization: localStorage.getItem('token') },
    }),
  };
}

export function getStudentById(studentId) {
  return {
    type: GET_STUDENT,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/student/${studentId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function updateStudent(studentId) {
  return {
    type: UPDATE_STUDENT,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/student/update/${studentId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}

export function deleteStudent(studentId) {
  return {
    type: DELETE_STUDENT,
    payload: axios.get(
      `${process.env.REACT_APP_API_DEV_URL}/student/delete/${studentId}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    ),
  };
}
