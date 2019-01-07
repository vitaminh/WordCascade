import React from 'react';

const words = [];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export default class CanvasPresentational extends React.Component {
  componentDidMount() {
    this.props.fetchInitialWordlist();
  }

  initializeCanvas() {
    const canvas = document.getElementById('wordfield-canvas');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;

    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 24px Helvetica, Arial, sans-serif';
    const wordlist = this.props.wordlist;
    this.initializeWords(wordlist);
    for (const word of words) {
      const y = getRandomInt(0, canvas.height);
      const x = getRandomInt(0, canvas.width);
      ctx.fillText(word, x, y);
    }
  }

  initializeWords(wordlist) {
    const NUM_OF_WORDS = 25;
    for (let i = 0; i < NUM_OF_WORDS; i++) {
      words.push(this.getRandomWord(wordlist));
    }
  }

  getRandomWord(wordlist) {
    return wordlist[getRandomInt(0, wordlist.length)];
  }

  // pass function scope and wordlist so it will have access as this will be called in scope.view.onFrame
  makeNewRandomTextItem(ctx, wordlist) {
    const randomWord = wordlist[getRandomInt(0, wordlist.length)];
    ctx.font = 'bold 24px Helvetica, Arial, sans-serif';
    ctx.fillText(randomWord, 40, 125);
  }

  render() {
    if (this.props.wordlist.length > 0) {
      this.initializeCanvas();
    }
    return <div />;
  }
}
