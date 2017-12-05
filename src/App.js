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

import { topics } from './lib/chinese';


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

  getLexicon(topic) {
    console.log(topic);
    return topics.find((t) => t.name === topic).lexicon;
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Home}/>

          <Route exact path="/:topic" component={SelectMode}/>
          <Route
              path="/:topic/practice"
              render={
                (props) => <CharacterRecognizePractice {...props} lexicon={this.getLexicon(props.match.params.topic)} />
              }
          />
          <Route
              path="/:topic/exercise"
              render={
                (props) => <CharacterRecognizeExercise {...props} lexicon={this.getLexicon(props.match.params.topic)} />
              }
          />
        </div>
      </Router>
    );

  }
}

export default App;
