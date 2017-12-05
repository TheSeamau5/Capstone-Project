import React, { Component } from 'react';
import CharacterRecognizeExercise from './CharacterRecognizeExercise';
import CharacterRecognizePractice from './CharacterRecognizePractice';
import SelectMode from './SelectMode';
import Home from './Home';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


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
      <Router>
        <div>
          <Route exact path="/" component={Home}/>

          <Route path="/:topic" component={SelectMode}/>
          <Route path="/:topic/practice" component={CharacterRecognizePractice}/>
          <Route path="/:topic/exercise" component={CharacterRecognizeExercise}/>
        </div>
      </Router>
    );

  }
}

export default App;
