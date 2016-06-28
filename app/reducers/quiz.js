import questions from './quiz.json';
import sortQuestions from './sorts.json';

import { BEGIN, ADVANCE } from '../actions/quiz';

import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

export function quiz(state = _.shuffle(questions)){
  return state;
}

export function sorters(state = _.shuffle(sortQuestions)){
  return state;
}

const progressDefaults = { 
  section: 'begin',
  questionNumber: 0
};

export function progress(state = progressDefaults, action){
  switch(action.type) {
  case BEGIN:
    return _.extend({}, state, {section:'questions'});
  case ADVANCE: 
    switch(state.section) {
    case 'questions': 
      var nextIndex = ++state.questionNumber;
      if (nextIndex < questions.length) {
        return _.extend({}, state, {questionNumber:nextIndex});
      }
      return _.extend({}, state, {section:'sort', questionNumber:0});
    case 'sort': 
      return _.extend({}, state, {section:'sort'});
    }
  }
  return state;
}
