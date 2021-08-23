import { combineReducers } from 'redux';
import examinationReducer from './examination_reducer';
import sportReducer from './sportReducer';

const allReducers = combineReducers({
  examinationReducer,
  sportReducer
});

export default allReducers;
