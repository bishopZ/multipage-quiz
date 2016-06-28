import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuizActions from '../actions/quiz';
import React, { Component, PropTypes } from 'react';
import QuestionCard from '../components/QuestionCard.jsx';

class Main extends Component {
  render () {
    const { quiz, progress, advance } = this.props;
    var Card = <QuestionCard question={quiz[0]} advance={advance} />;
    console.log(progress);
    if (progress !== 'begin') {
      Card = <QuestionCard question={quiz[1]} advance={advance} />;
    }
    return (
      <div className='page-content'>
        {Card}
      </div>
    );
  }
}

Main.propTypes = {
  advance: PropTypes.func.isRequired,
  quiz: PropTypes.array.isRequired,
  sorters: PropTypes.array.isRequired,
  progress: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    sorters: state.sorters,
    progress: state.progress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(QuizActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
