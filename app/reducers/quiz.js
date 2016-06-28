import questions from './quiz.json';
import sortQuestions from './sorts.json';

import { BEGIN, ADVANCE } from '../actions/quiz';

import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

// Helpers
var boostDefaults = {
  T: 0,
  S: 0,
  D: 0,
  P: 0,
  R: 0,
  W: 0,
  M: 0,
  C: 0,
  V: 0
};

const progressDefaults = { 
  section: 'begin',
  questionNumber: 0,
  boosts: _.extend({}, boostDefaults)
};

function changeState(state, update){
  return _.extend({}, state, update);
}

function doBoost(state, boostString){
  var boostMap = _.extend({}, state.boosts);
  var boosts = boostString.split(',');
  boosts.forEach(function(boost){
    ++boostMap[boost];
  });
  return boostMap;
}

// Exports
var quizData = _.shuffle(questions);
export function quiz(state = quizData){
  return state;
}

var sortData = _.shuffle(sortQuestions);
export function sorters(state = sortData){
  return state;
}

var boosts = {};

export function progress(state = progressDefaults, action){
  switch(action.type) {
  case BEGIN:
    boosts = _.extend({}, boostDefaults);
    return changeState(state, {section:'questions', boosts: boosts});
  case ADVANCE: 
    switch(state.section) {
    case 'questions': 
      // render boosts
      if (action.boost) {
        var prevQuestion = quizData[state.questionNumber];
        var answer = _.find(prevQuestion.answers, function(answer){
          return answer.text === action.boost;
        });
        if (answer) {
          boosts = doBoost(state, answer.boost);
          console.log(boosts);
        }
      }
      // set up next question
      var nextIndex = ++state.questionNumber;
      if (nextIndex < questions.length) {
        return changeState(state, {
          questionNumber: nextIndex, 
          boosts: boosts
        });
      }
      // or if all the questions are done
      return changeState(state, {
        section:'sort', 
        questionNumber: 0, 
        boosts: boosts
      });
    case 'sort': 
      return changeState(state, {
        section:'sort', 
        boosts: boosts
      });
    }
  }
  return state;
}
