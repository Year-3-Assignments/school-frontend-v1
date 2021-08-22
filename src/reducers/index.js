import { combineReducers } from 'redux';
import examinationReducer from './examination_reducer';

const allReducers = combineReducers({
  examinationReducer,
});

export default allReducers;
