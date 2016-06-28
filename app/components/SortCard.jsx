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
  transition() {
    const action = this.props.action;
    action();
  }
  render() {
    const sorterData = this.props.sorter;

    var transition = this.transition.bind(this);
    var answerButtons = _.shuffle(sorterData.answers).map(function(answer, index){
      return <button style={{color: answer.text}} key={index} onClick={transition} className="btn btn-default" type="button">{answer.text}</button>;
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
  action: PropTypes.func.isRequired
};

export default SortCard;
