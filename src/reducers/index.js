import studentReducer from './student_reducer';
import examinationReducer from './examination_reducer';
import userReducer from './user_reducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  examinationReducer,
  studentReducer,
  userReducer,
});

export default allReducers;
