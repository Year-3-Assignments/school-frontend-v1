import studentReducer from './student_reducer';
import examinationReducer from './examination_reducer';
import userReducer from './user_reducer';
import employeeReducer from './employee_reducer';
import salaryReducer from './salary_reducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  examinationReducer,
  studentReducer,
  userReducer,
  employeeReducer,
  salaryReducer,
});

export default allReducers;
