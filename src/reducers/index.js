import { combineReducers } from 'redux';
import employeeReducer  from './employee_reducer';

const allReducers = combineReducers({
  employeeReducer,
});

export default allReducers;