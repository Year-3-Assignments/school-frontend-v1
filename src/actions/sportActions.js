import axios from 'axios';
import { CREATE_SPORT, GET_ALL_SPORT, GET_SPORT_FOR_SPORT_INVENTORY, SET_SPORT, GET_SPORT, 
  GET_COACH_FOR_SPORT, GET_STUDENT_FOR_SPORT, UPDATE_SPORT, DELETE_SPORT } from './index';

export function createSport(sport) {
  return {
    type: CREATE_SPORT,
    payload: axios.post(`http://localhost:4000/sport/add/`, sport),
  };
}

export function getAllSport() {
  return {
    type: GET_ALL_SPORT,
    payload: axios.get(`http://localhost:4000/sport/`)
  };
}

export function getAllSportStudent() {
  return {
    type: GET_STUDENT_FOR_SPORT,
    payload: axios.get(`http://localhost:4000/sport/student/`)
  };
}

export function getAllSportCoach() {
  return {
    type: GET_COACH_FOR_SPORT,
    payload: axios.get(`http://localhost:4000/sport/coach`)
  };
}