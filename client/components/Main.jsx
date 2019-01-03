import React from 'react';
import axios from 'axios';
import Canvas from './Canvas';
import paper, { Point } from 'paper';

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
    const myCanvas = document.getElementById('paper-canvas');
    paper.setup(myCanvas);
    const width = paper.view.size.width;
    const height = paper.view.size.height;
    const text = new paper.PointText(new Point(width / 2, height / 2));
    text.justification = 'center';
    text.fontSize = '1.6em';
    const randomIndex = getRandomInt(0, this.state.wordlist.length);
    text.content = this.state.wordlist[randomIndex];

    // render
    paper.view.draw();
    paper.view.onFrame = function(event) {
      text.rotate(.5);
    };
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}
