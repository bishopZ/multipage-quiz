import questions from './quiz.json';
import sortQuestions from './sorts.json';
import { ADVANCE } from '../actions/quiz';

export function quiz(state = questions){
  return state;
}

export function sorters(state = sortQuestions){
  return state;
}

export function progress(state = 'begin', action){
  switch(action.type) {
    case ADVANCE: 
      return 'step1';
  }
  return state;
}
