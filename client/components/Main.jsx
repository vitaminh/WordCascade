import React from 'react';
import axios from 'axios';

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
    return <div>{this.state.wordlist.map(e => <div>{e}</div>)}</div>;
  }
}
