import { combineReducers } from 'redux';
import examinationReducer from './examination_reducer';
import userReducer from './user_reducer';

const allReducers = combineReducers({
  examinationReducer,
  userReducer,
});

export default allReducers;
