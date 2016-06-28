var $ = global.$ = global.jQuery = require('jquery');

import React, {PropTypes, Component} from 'react';

class BeginCard extends Component {
  componentDidMount () {
    if (!$.modal) {
      require('bootstrap');
    }
    $('.modal').modal({show: true, backdrop: 'static'});
  }
  transition() {
    const action = this.props.action;
    action();
  }
  render() {
    var transition = this.transition.bind(this);
    return (
      <div className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h4>Ready?</h4>
            </div>
            <div className="modal-footer">
              <button onClick={transition} type="button" className="btn btn-default">Begin!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BeginCard.propTypes = {
  action: PropTypes.func.isRequired
};

export default BeginCard;
