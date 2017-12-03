import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import han from 'han';
import { wordPinyinEquivalent } from './lib/chinese';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

recognition.lang = 'zh-cn';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

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

  componentDidMount() {
    recognition.onresult = (event) => {
      console.log('Hello');
      const last = event.results.length - 1;
      const word = event.results[last][0].transcript;
      console.log(word);
      console.dir(this);
      this.setCurrentWord(word);
    };

    recognition.onspeechend = () => {
      console.log(this.state.currentWord);
      recognition.stop();
    };
  }


  renderButton() {
    return (
      <button onClick={() => recognition.start()}>Click Me</button>
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
