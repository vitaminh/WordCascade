import axios from 'axios';

// ACTION TYPES
const RECEIVE_WORDLIST = 'RECEIVE_WORDLIST';

// ACTION CREATORS
const receiveWordlist = wordlist => ({
  type: RECEIVE_WORDLIST,
  wordlist
});

// THUNK CREATORS
export const fetchWordlist = () => {
  return async dispatch => {
    const response = await axios.get('/api/wordlist');
    const action = receiveWordlist(response.data);
    dispatch(action);
  }
}

export const wordlist = (wordlistState = [], action) => {
  switch (action.type) {
    case RECEIVE_WORDLIST:
      return action.wordlist;
    default:
      return wordlistState;
  }
};

export default wordlist;
