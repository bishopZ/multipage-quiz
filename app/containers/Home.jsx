import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuizActions from '../actions/quiz';
import React, { Component, PropTypes } from 'react';
import SortCard from '../components/SortCard.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import BeginCard from '../components/BeginCard.jsx';
import MatchCard from '../components/MatchCard.jsx';

class Main extends Component {
  render () {
    const { quiz, sorters, progress, advance, begin, sortSelection } = this.props;
    
    var Card = <BeginCard action={begin} />;
    
    if (progress.section === 'questions') {
      var question = quiz[progress.questionNumber];
      Card = <QuestionCard question={question} action={advance} />;
    } else if (progress.section === 'sort') {
      var sorter = sorters[progress.currentSort];
      Card = <SortCard sorter={sorter} selections={progress.selections} action={sortSelection} />;
    } else if (progress.section === 'match') {
      Card = <MatchCard action={begin} match={progress.match} />;
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
  sortSelection: PropTypes.func.isRequired,
  quiz: PropTypes.array.isRequired,
  sorters: PropTypes.array.isRequired,
  progress: PropTypes.shape({
    section: PropTypes.string.isRequired,
    questionNumber: PropTypes.number,
    selectons: PropTypes.array,
    match: PropTypes.object
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
