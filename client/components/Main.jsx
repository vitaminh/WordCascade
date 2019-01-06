import React from 'react';
import Canvas from './Canvas';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <canvas id="paper-canvas" data-paper-resize="true" />
        <Canvas />
      </div>
    );
  }
}
