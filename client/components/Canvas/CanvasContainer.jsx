import {connect} from 'react-redux';

import {fetchWordlist} from '../../reducers/wordlist'
import CanvasPresentational from './CanvasPresentational';

const mapState = state => {
  return {
    wordlist: state.wordlist,
    scope: state.scope
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialWordlist: () => dispatch(fetchWordlist())
  };
};

export default connect(
  mapState,
  mapDispatch
)(CanvasPresentational);