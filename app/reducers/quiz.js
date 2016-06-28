import questions from './quiz.json';
import sortQuestions from './sorts.json';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/quiz';

export function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}

export function quiz(state = questions) {
  return state;
}

export function sorters(state = sortQuestions) {
  return state;
}
