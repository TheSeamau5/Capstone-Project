import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import han from 'han';
import { wordPinyinEquivalent, transcribeVoice } from './lib/chinese';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentWord: null
    };
  }

  setCurrentWord(word) {
    this.setState({
      currentWord: word
    });
  }

  onClick() {
    return transcribeVoice().then((word) => {
      this.setCurrentWord(word);
    });
  }

  renderButton() {
    return (
      <button onClick={() => this.onClick()}>Click Me</button>
    );
  }

  render() {
    if (!!this.state.currentWord) {
      console.log(this.state.currentWord);
      console.dir(han.pinyin(this.state.currentWord));
    }

    const testWord = '为什么';

    return (
      <div className="App">
        {this.renderButton()}
        <p>{this.state.currentWord}</p>
        <p>{!!this.state.currentWord ? han.pinyin(this.state.currentWord).join(' ') : null}</p>
        <p>{!!this.state.currentWord && wordPinyinEquivalent(testWord, this.state.currentWord) ? 'True' : 'False'}</p>
      </div>
    );
  }
}

export default App;
