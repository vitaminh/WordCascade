import React from 'react';
import { Point } from 'paper';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export default class CanvasPresentational extends React.Component {
  componentDidMount() {
    this.props.fetchInitialWordlist();
    this.props.scope.setup(document.getElementById('paper-canvas'));
  }

  makeNewRandomTextItem() {
    const text = new this.props.scope.PointText(
      new Point(this.props.scope.view.center)
    );
    text.justification = 'center';
    let randomIndex = getRandomInt(0, this.props.wordlist.length);
    text.content = this.props.wordlist[randomIndex];
    text.fontWeight = 'bold';
    text.fontFamily = 'Helvetica';
    return text;
  }

  render() {
    if (this.props.wordlist.length === 0) {
      return <canvas id="paper-canvas" data-paper-resize="true" />;
    }
    const scope = this.props.scope;
    let text = this.makeNewRandomTextItem();
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
      const dividedVector = vector.divide(175);
      text.position = text.position.add(dividedVector);

      // If the distance between the path and the destination is less
      // than 5, we define a new random point in the view to move the
      // path to:
      if (vector.length < 5) {
        destination = Point.random().multiply(scope.view.size);
      }
      text.scale(1.013);
      text.opacity -= 0.005;
      if (text.opacity <= 0.005) {
        text = makeNewItemHelper();
        destination = Point.random().multiply(scope.view.size);
      }
    };
    // paper.view.onResize = () => {
    //   text.point.x = paper.view.size.width / 2;
    //   text.point.y = paper.view.size.height / 2;
    // };

    // render
    scope.view.draw();
    return <canvas id="paper-canvas" data-paper-resize="true" />;
  }
}
