// legacy loading for bootstrap
var $ = global.$ = global.jQuery = require('jquery');

import React, {PropTypes, Component} from 'react';

class QuestionCard extends Component {
  componentDidUpdate() {
    $('button').blur();    
  }
  componentDidMount () {
    // best way to require bootstrap
    if (!$.modal) {
      require('bootstrap');
    }
    $('.modal').modal({show: true, backdrop: 'static'});
  }
  componentWillUnmount(){
    $('.modal-backdrop').hide(); // for black background
    $('body').removeClass('modal-open'); // For scroll run
    $('.modal').modal('hide'); 
  }
  transition(event) {
    const action = this.props.action;
    action($(event.currentTarget).text());
  }
  render() {
    const questionData = this.props.question;

    var transition = this.transition.bind(this);
    var answerButtons = questionData.answers.map(function(answer, index){
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
  action: PropTypes.func.isRequired
};

export default QuestionCard;
