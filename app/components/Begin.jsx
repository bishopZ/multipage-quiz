import React, { Component, PropTypes } from 'react';

class Begin extends Component {
  render () {
    const { increment, decrement, counter } = this.props;

    return (
      <div className="counter">
        <h1>{counter}</h1>
        <button onClick={increment}>Increase</button>
        <button onClick={decrement}>Decrease</button>
      </div>
    );
  }
}

Begin.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Begin;