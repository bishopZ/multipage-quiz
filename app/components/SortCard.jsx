var $ = global.$ = global.jQuery = require('jquery');

import React, {PropTypes, Component} from 'react';
import '../helpers/underscore.shuffle.js';
import _ from 'underscore';

class SortCard extends Component {
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
    const sorterData = this.props.sorter;
    const selections = this.props.selections;

    var transition = this.transition.bind(this);
    var answerButtons = _.shuffle(sorterData.answers).map(function(answer, index){
      var classNames = 'btn btn-default';
      if (selections.indexOf(answer.text) !== -1) {
        classNames += ' btn-primary disabled';
      }
      return <button style={{color: answer.text}} key={index} onClick={transition} className={classNames} type="button">{answer.text}</button>;
    });
    return (
      <div className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h4>{sorterData.question}</h4>
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

SortCard.propTypes = {
  sorter: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  selections: PropTypes.array
};

export default SortCard;
