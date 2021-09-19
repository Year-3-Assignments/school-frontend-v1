import studentReducer from './student_reducer';
import examinationReducer from './examination_reducer';
import sportReducer from './sportReducer';
import userReducer from './user_reducer';
import employeeReducer from './employee_reducer';
import sportInventoryReducer from './sportInventoryReducer'
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  examinationReducer,
  sportReducer,
  studentReducer,
  userReducer,
  employeeReducer,
  sportInventoryReducer
});

export default allReducers;
