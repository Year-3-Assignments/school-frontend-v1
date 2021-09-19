import axios from 'axios';
import { CREATE_SPORT_INVENTORY, GET_ALL_SPORT_INVENTORY, SET_SPORT_INVENTORY, 
  UPDATE_SPORT_INVENTORY, DELETE_SPORT_INVENTORY, GET_SPORT_FOR_SPORT_INVENTORY } from './index';

export function createSportInventory(sport) {
  return {
    type: CREATE_SPORT_INVENTORY,
    payload: axios.post(`${process.env.REACT_APP_API_DEV_URL}/sportsinventory/add`, sport),
  };
}

export function setSportInventory(sportData) {
  return {
    type: SET_SPORT_INVENTORY,
    payload: sportData,
  };
}

export function getAllSportInventory() {
  return {
    type: GET_ALL_SPORT_INVENTORY,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/sportsinventory/`)
  };
}

export function getSportForSportInventory() {
  return {
    type: GET_SPORT_FOR_SPORT_INVENTORY,
    payload: axios.get(`${process.env.REACT_APP_API_DEV_URL}/sport/`)
  };
}

export function deleteSportInventory(sportData) {
  return {
    type: DELETE_SPORT_INVENTORY,
    payload: axios.delete(
      `${process.env.REACT_APP_API_DEV_URL}/sportsinventory/${sportData._id}`
    ),
  };
}

export function updateSportInventory(sportData) {
  return {
    type: UPDATE_SPORT_INVENTORY,
    payload: axios.put(
      `${process.env.REACT_APP_API_DEV_URL}/sportsinventory/${sportData._id}`,
      sportData
    ),
  };
}