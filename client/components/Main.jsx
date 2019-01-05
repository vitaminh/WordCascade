import React from 'react';
import Canvas from './Canvas';
import paper, { Point } from 'paper';
import { connect } from 'react-redux';
import { fetchWordlist } from '../reducers/wordlist';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.makeNewRandomTextItem = this.makeNewRandomTextItem.bind(this);
  }
  componentDidMount() {
    this.props.fetchInitialWordlist();
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
    if (this.props.wordlist.length === 0) return <h1>Loading...</h1>;
    const scope = this.props.scope;
    const myCanvas = document.getElementById('paper-canvas');
    scope.setup(myCanvas);
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
      text.scale(1.007);
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

    return <div />;
  }
}

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
)(Main);
