var $ = global.$ = global.jQuery = require('jquery');

import React, {PropTypes, Component} from 'react';

class MatchCard extends Component {
  componentDidMount () {
    // best way to require bootstrap, afaik
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
    var transition = this.transition.bind(this);
    var match = this.props.match;
    return (
      <div className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h4>Your Character</h4>
              <h5><span className="attr-title">Element: </span>{match.essence}</h5>
              <h5><span className="attr-title">Color: </span>{match.color}</h5>
              <h5><span className="attr-title">Powers: </span>{match.powers}</h5>
            </div>
            <div className="modal-footer">
              <button onClick={transition} type="button" className="btn btn-default">Pick Again!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MatchCard.propTypes = {
  action: PropTypes.func.isRequired,
  match: PropTypes.shape({
    essence: PropTypes.string,
    color: PropTypes.string,
    powers: PropTypes.string
  }).isRequired
};

export default MatchCard;
