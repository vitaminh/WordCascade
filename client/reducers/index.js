import { combineReducers } from 'redux';
import scope from './scope';
import wordlist from './wordlist';

const rootReducer = combineReducers({
  scope,
  wordlist
});

export default rootReducer;
