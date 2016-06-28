import { combineReducers } from 'redux';
import { progress, quiz, sorters } from './quiz';

const rootReducer = combineReducers({
  progress,
  quiz,
  sorters
});

export default rootReducer;
