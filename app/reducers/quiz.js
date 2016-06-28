import questions from './quiz.json';
import sortQuestions from './sorts.json';

import { ADVANCE } from '../actions/quiz';

import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

export function quiz(state = _.shuffle(questions)){
  return state;
}

export function sorters(state = _.shuffle(sortQuestions)){
  return state;
}

export function progress(state = 'begin', action){
  switch(action.type) {
  case ADVANCE: 
    return 'step1';
  }
  return state;
}
