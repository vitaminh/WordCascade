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
    const text = new paper.PointText(new Point(paper.view.center));
    text.justification = 'center';
    text.fontSize = '1.2em';
    const randomIndex = getRandomInt(0, this.state.wordlist.length);
    text.content = this.state.wordlist[randomIndex];

    // render
    paper.view.draw();
    let destination = Point.random().multiply(paper.view.size);
    paper.view.onFrame = function(event) {
      // Each frame, move the path 1/30th of the difference in position
      // between it and the destination.

      // The vector is the difference between the position of
      // the text item and the destination point:
      const vector = destination.subtract(text.position);

      // We add 1/30th of the vector to the position property
      // of the text item, to move it in the direction of the
      // destination point:
      const dividedVector = vector.divide(30);
      text.position = text.position.add(dividedVector);

      // If the distance between the path and the destination is less
      // than 5, we define a new random point in the view to move the
      // path to:
      if (vector.length < 5) {
        destination = Point.random().multiply(paper.view.size);
      }
    };
    // paper.view.onResize = () => {
    //   text.point.x = paper.view.size.width / 2;
    //   text.point.y = paper.view.size.height / 2;
    // };
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}
