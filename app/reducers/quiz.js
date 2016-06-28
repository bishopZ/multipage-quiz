import questions from './quiz.json';
import sortQuestions from './sorts.json';

import { BEGIN, ADVANCE } from '../actions/quiz';

import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

// Helpers
const progressDefaults = { 
  section: 'begin',
  questionNumber: 0
};

function changeState(state, update){
  return _.extend({}, state, update);
}

// Exports
export function quiz(state = _.shuffle(questions)){
  return state;
}

export function sorters(state = _.shuffle(sortQuestions)){
  return state;
}

export function progress(state = progressDefaults, action){
  switch(action.type) {
  case BEGIN:
    return changeState(state, {section:'questions'});
  case ADVANCE: 
    switch(state.section) {
    case 'questions': 
      var nextIndex = ++state.questionNumber;
      if (nextIndex < questions.length) {
        return changeState(state, {questionNumber:nextIndex});
      }
      return changeState(state, {section:'sort', questionNumber:0});
    case 'sort': 
      return changeState(state, {section:'sort'});
    }
  }
  return state;
}
