import axios from 'axios';
import { CREATE_SPORT, GET_ALL_SPORT, GET_SPORT_FOR_SPORT_INVENTORY, SET_SPORT, GET_SPORT, 
  GET_COACH_FOR_SPORT, GET_STUDENT_FOR_SPORT, UPDATE_SPORT, DELETE_SPORT } from './index';

export function createSport(sport) {
  return {
    type: CREATE_SPORT,
    payload: axios.post(`${process.env.REACT_APP_API_DEV_URL}/sport/add/`, sport),
  };
}

export function setSport(sportData) {
  return {
    type: SET_SPORT,
    payload: sportData,
  };
}

export function getAllSport() {
  return {
    type: GET_ALL_SPORT,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/sport/`)
  };
}

export function getAllSportStudent() {
  return {
    type: GET_STUDENT_FOR_SPORT,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/sport/student/`)
  };
}

export function deleteSport(examinationData) {
  return {
    type: DELETE_SPORT,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/sport/${examinationData._id}`
    ),
  };
}

export function getAllSportCoach() {
  return {
    type: GET_COACH_FOR_SPORT,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/sport/coach`)
  };
}

export function updateSport(sportData) {
  return {
    type: UPDATE_SPORT,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/sport/${sportData._id}`,
      sportData
    ),
  };
}