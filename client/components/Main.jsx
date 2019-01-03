import React from 'react';
import axios from 'axios';
import Canvas from './Canvas';
import paper, { Point } from 'paper';

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
    const myCanvas = document.getElementById('paper-canvas');
    paper.setup(myCanvas);

    // Draw a circle in the center
    const width = paper.view.size.width;
    const height = paper.view.size.height;
    const text = new paper.PointText(new Point(width / 2, height / 2));
    text.justification = 'center';
    text.fillColor = 'black';
    const randomIndex = getRandomInt(0, this.state.wordlist.length);
    text.content = this.state.wordlist[randomIndex];

    // var circle = new paper.Shape.Circle({
    //   center: [width / 2, height / 2],
    //   fillColor: 'grey',
    //   radius: 50
    // });

    // render
    paper.view.draw();
  }

  render() {
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}
