import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as QuizActions from '../actions/quiz';
import React, { Component, PropTypes } from 'react';
import Title from '../components/Home/Title.jsx';
import Description from '../components/Home/Description.jsx';

class Main extends Component {
  render () {
    const { increment, decrement, counter, quiz, sorters } = this.props;
    return (
      <div className='page-content'>
        <Title question={quiz[0].question} />
        <Description question={sorters[0].question} />
        <div className="counter">
          <h1>{counter}</h1>
          <button onClick={increment}>Increase</button>
          <button onClick={decrement}>Decrease</button>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  quiz: PropTypes.array.isRequired,
  sorters: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
    quiz: state.quiz,
    sorters: state.sorters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(QuizActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
