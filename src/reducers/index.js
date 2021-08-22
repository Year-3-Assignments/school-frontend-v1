import studentReducer from './student_reducer';
import examinationReducer from './examination_reducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  examinationReducer,
  studentReducer,
});

export default allReducers;
