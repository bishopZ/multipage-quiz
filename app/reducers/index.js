import { combineReducers } from 'redux';
import { counter, quiz, sorters } from './quiz';

const rootReducer = combineReducers({
  counter,
  quiz,
  sorters
});

export default rootReducer;
