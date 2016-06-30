import questions from './quiz.json';
import sortQuestions from './sorts.json';
import matches from './matches.json';

import { BEGIN, ADVANCE, SORT_SELECTION } from '../actions/quiz';

import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

// Helpers

var initalLimit = 4;
var answerMod = 1.3;
var sortMod = 0.9;

var boosts = {};

var boostDefaults = {
  V: 0,
  C: 0,
  M: 0,
  W: 0,
  R: 0,
  P: 0,
  D: 0,
  S: 0,
  T: 0
};

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

function doBoost(state, boostString, modifier = 1){
  var outputMap = _.extend({}, boosts);
  var boostUpdates = boostString.split(',');
  boostUpdates.forEach(function(boost){
    outputMap[boost] += modifier;
  });
  boosts = outputMap;
}

function attemptMatch(boosts){
  var maxValue = _.max(boosts);
  var topKey = _.reduce(boosts, function(m, value, key){
    if (value === maxValue) {
      m = key;
    }
    return m;
  }, false);
  var match = matches[topKey];
  console.log(topKey, maxValue);
  return {
    match: match,
    top: {
      key: topKey,
      value: maxValue
    }
  };
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
        doBoost(state, answer.boost, answerMod);
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
    // attempt match
    var matchData = attemptMatch(boosts);
    if (Math.round(matchData.top.value) > initalLimit) {
      // render completion screen
      return changeState(state, {
        section: 'match',
        selections: [],
        match: matchData.match
      });
    }
    // or move on to sorters
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
    // console.log(selections);

    var boostArray = selections.map(function(selection){
      var answer = _.find(sortData[state.currentSort].answers, function(answer){
        return answer.text === selection;
      });
      return answer.boost;
    });
    doBoost(state, boostArray.join(','), sortMod);
    
    console.log(boosts); 

    // attempt match
    var matchDataAfterSort = attemptMatch(boosts);
    if (Math.round(matchDataAfterSort.top.value) > 4) {
      // render completion screen
      return changeState(state, {
        section: 'match',
        selections: [],
        match: matchDataAfterSort.match
      });
    } 
    // no match yet, keep sorting them
    if (state.currentSort + 1 < sortData.length) {
      return changeState(state, {
        section: 'sort',
        selections: [],
        currentSort: state.currentSort + 1
      });
    } 
    // just render the best match
    return changeState(state, {
      section: 'match',
      selections: [],
      match: matchDataAfterSort.match
    });
  }
  return state;
}
