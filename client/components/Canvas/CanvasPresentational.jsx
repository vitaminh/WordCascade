import React from 'react';
import { Point, Shape, Color } from 'paper';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export default class CanvasPresentational extends React.Component {
  componentDidMount() {
    this.props.fetchInitialWordlist();
    this.props.scope.setup(document.getElementById('paper-canvas'));
  }

  initializeCanvas() {
    const scope = this.props.scope;
    const wordlist = this.props.wordlist;
    // const circle = new Shape.Circle({
    //   center: new Point(scope.view.center),
    //   radius: 250,
    //   fillColor: new Color(1, 1, 0)
    // });
    let text = this.makeNewRandomTextItem(scope, wordlist);
    const makeNewItemHelper = this.makeNewRandomTextItem;

    let destination = Point.random().multiply(scope.view.size);
    scope.view.onFrame = function(event) {
      // Each frame, move the path 1/30th of the difference in position
      // between it and the destination.

      // The vector is the difference between the position of
      // the text item and the destination point:
      const vector = destination.subtract(text.position);

      // We add 1/30th of the vector to the position property
      // of the text item, to move it in the direction of the
      // destination point:
      const dividedVector = vector.divide(200);
      text.position = text.position.add(dividedVector);

      // If the distance between the path and the destination is less
      // than 5, we define a new random point in the view to move the
      // path to:
      if (vector.length < 5) {
        destination = Point.random().multiply(scope.view.size);
      }
      text.scale(1.013);
      text.opacity -= 0.0045;
      if (text.opacity <= 0.005) {
        text = makeNewItemHelper(scope, wordlist);
        destination = Point.random().multiply(scope.view.size);
      }
    };
    scope.view.onResize = () => {
      scope.view.update();
    };
  }

  // pass function scope and wordlist so it will have access as this will be called in scope.view.onFrame
  makeNewRandomTextItem(scope, wordlist) {
    return new scope.PointText({
      point: scope.view.center,
      justification: 'center',
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
      content: wordlist[getRandomInt(0, wordlist.length)]
    });
  }

  render() {
    if (this.props.wordlist.length === 0) {
      return <div />;
    } else {
      // render
      this.initializeCanvas();
      this.props.scope.view.draw();
      return <div />;
    }
  }
}
