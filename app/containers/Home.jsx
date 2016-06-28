import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuizActions from '../actions/quiz';
import React, { Component, PropTypes } from 'react';
import QuestionCard from '../components/QuestionCard.jsx';
import BeginCard from '../components/BeginCard.jsx';

class Main extends Component {
  render () {
    const { quiz, progress, advance, begin } = this.props;
    
    var Card = <BeginCard action={begin} />;
    
    if (progress.section === 'questions') {
      var question = quiz[progress.questionNumber];
      Card = <QuestionCard question={question} action={advance} />;
    }

    return (
      <div className='page-content'>
        {Card}
      </div>
    );
  }
}

Main.propTypes = {
  begin: PropTypes.func.isRequired,
  advance: PropTypes.func.isRequired,
  quiz: PropTypes.array.isRequired,
  sorters: PropTypes.array.isRequired,
  progress: PropTypes.shape({
    section: PropTypes.string.isRequired,
    questionNumber: PropTypes.number.isRequired
  }).isRequired
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
