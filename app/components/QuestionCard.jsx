import React, {PropTypes, Component} from 'react';

class QuestionCard extends Component {
  render() {
    const questionData = this.props.question;
    return (
      <div>
        <h2 className='pageTitle'>{questionData.question}</h2>;
        <ul className='answers'>
          <li><button className='btn'>{questionData.answers[0].text}</button></li>
          <li><button className='btn'>{questionData.answers[1].text}</button></li>
        </ul>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired
};

export default QuestionCard;
