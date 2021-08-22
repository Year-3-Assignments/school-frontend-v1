import { combineReducers } from 'redux';
import employeeReducer  from './employee_reducer';
import examinationReducer from './examination_reducer';

const allReducers = combineReducers({
  employeeReducer,
  examinationReducer,

});

export default allReducers;