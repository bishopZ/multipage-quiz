import questions from './quiz.json';
import sortQuestions from './sorts.json';
import matches from './matches.json';

import { BEGIN, ADVANCE, SORT_SELECTION } from '../actions/quiz';

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

var boosts = {};

const progressDefaults = { 
  section: 'begin',
  questionNumber: 0,
  currentSort: 0,
  boosts: _.extend({}, boostDefaults),
  selections: [],
  match: {}
};

function changeState(state, update){
  return _.extend(
    {}, 
    progressDefaults, 
    state, 
    update, 
    {boosts: boosts}
  );
}

function doBoost(state, boostString){
  var outputMap = _.extend({}, boosts);
  var boostUpdates = boostString.split(',');
  boostUpdates.forEach(function(boost){
    ++outputMap[boost];
  });
  boosts = outputMap;
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

export function progress(state = progressDefaults, action){
  switch(action.type) {
  
  case BEGIN:
    boosts = _.extend({}, boostDefaults);
    return changeState({}, {
      section:'questions'
    });
  
  case ADVANCE:   
    // render boosts
    if (action.boost) {
      var prevQuestion = quizData[state.questionNumber];
      var answer = _.find(prevQuestion.answers, function(answer){
        return answer.text === action.boost;
      });
      if (answer) {
        doBoost(state, answer.boost);
        console.log(boosts);
      }
    }
    // set up next question
    var nextIndex = ++state.questionNumber;
    if (nextIndex < questions.length) {
      return changeState(state, {
        questionNumber: nextIndex
      });
    }
    // or if all the questions are done
    return changeState(state, {
      section: 'sort', 
      questionNumber: 0,
      selections: [],
      match: {}
    });
    
  case SORT_SELECTION: 
    var selections = state.selections.concat([action.select]);
    if (selections.length < sortData[state.currentSort].choices) {
      return changeState(state, {
        section: 'sort',
        selections: selections
      });
    }
    // else, apply boosts
    console.log(selections);

    var boostArray = selections.map(function(selection){
      var answer = _.find(sortData[state.currentSort].answers, function(answer){
        return answer.text === selection;
      });
      return answer.boost;
    });
    doBoost(state, boostArray.join(','));
    
    console.log(boosts); 

    // attempt match
    var topBoost = _.reduce(boosts, function(max, current, key) {
      return max && max.value > current ? max : {
        value: current,
        key: key
      };
    });
    var match = matches[topBoost.key];

    if (topBoost.value > 4) {
      // render completion screen
      return changeState(state, {
        section: 'match',
        selections: [],
        match: match
      });
    } else {
      // no match yet, keep sorting them
      if (state.currentSort + 1 < sortData.length) {
        return changeState(state, {
          section: 'sort',
          selections: [],
          currentSort: state.currentSort + 1
        });
      } else {
        // just render the best match
        return changeState(state, {
          section: 'match',
          selections: [],
          match: match
        });
      }
    }
  }
  return state;
}
