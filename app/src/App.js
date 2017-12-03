import React, { Component } from 'react';
// import CharacterPage from './CharacterPage';
import CharacterRecognizeExercise from './CharacterRecognizeExercise';

import './App.css';


const lexicon = [
  '我',
  '你',
  '他',
  '她',
  '我们',
  '你们',
  '他们',
  '她们',
  '你好',
  '什么',
  '为什么',
  '一',
  '二',
  '三'
];




class App extends Component {

  render() {
    return (
      <div className='App'>
        <CharacterRecognizeExercise lexicon={lexicon}/>
      </div>

    );

  }
}

export default App;
