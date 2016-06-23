import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Begin from '../components/Begin.jsx';
import * as BeginActions from '../actions/begin';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BeginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Begin);
