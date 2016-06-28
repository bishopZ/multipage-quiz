var $ = global.$ = global.jQuery = require('jquery');

import React, {PropTypes, Component} from 'react';
import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

class QuestionCard extends Component {
  componentDidMount () {
    require('bootstrap');
    $('.modal').modal({show: true, backdrop: 'static'});
  }
  transition() {
    const advance = this.props.advance;
    advance();
  }
  render() {
    const questionData = this.props.question;
    var transition = this.transition.bind(this);
    var answerButtons = _.shuffle(questionData.answers).map(function(answer, index){
      return <button key={index} onClick={transition} type="button" className="btn btn-default">{answer.text}</button>;
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
  question: PropTypes.object.isRequired,
  advance: PropTypes.func.isRequired
};

export default QuestionCard;
