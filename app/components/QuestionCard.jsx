var $ = global.$ = global.jQuery = require('jquery');

import React, {PropTypes, Component} from 'react';

class QuestionCard extends Component {
  componentDidMount () {
    require('bootstrap');
    $('.modal').modal({show: true, backdrop: 'static'});
  }
  render() {
    const questionData = this.props.question;
    var answerButtons = questionData.answers.map(function(answer){
      return <button type="button" className="btn btn-default">{answer.text}</button>;
    });
    return (
      <div className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h4>{questionData.question}</h4>
            </div>
            <div className="modal-footer">
              {answerButtons}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired
};

export default QuestionCard;
