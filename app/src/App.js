import React, { Component } from 'react';
// import CharacterPage from './CharacterPage';
import CharacterRecognizeExercise from './CharacterRecognizeExercise';

import './App.css';


const lexicon = [
  '我',
  '你',
  '我们',
  '你们',
  '你好',
  '什么',
  '为什么'
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
