import React from 'react';
import axios from 'axios';

const NUM_OF_RANDOM_WORDS = 20;
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordlist: []
    };
  }

  async componentDidMount() {
    const response = await axios.get('/api/wordlist');
    const wordlist = response.data;
    this.setState(prevState => {
      return {
        ...prevState,
        wordlist
      };
    });
  }

  render() {
    const words = this.state.wordlist;
    const randomWords = [];
    for (let i = 0; i < NUM_OF_RANDOM_WORDS; i++) {
      randomWords.push(words[getRandomInt(0, words.length)]);
    }
    return (
      <div>
        {randomWords.map(e => (
          <div>{e}</div>
        ))}
      </div>
    );
  }
}
