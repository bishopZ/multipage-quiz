import { combineReducers } from 'redux';
import begin from './begin';

const rootReducer = combineReducers({
  counter: begin
});

export default rootReducer;
