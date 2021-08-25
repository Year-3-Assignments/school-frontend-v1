import studentReducer from './student_reducer';
import examinationReducer from './examination_reducer';
import sportReducer from './sportReducer';
import userReducer from './user_reducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  examinationReducer,
  sportReducer,
  studentReducer,
  userReducer,
});

export default allReducers;
