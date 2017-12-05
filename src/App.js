import React, { Component } from 'react';
import CharacterRecognizeExercise from './CharacterRecognizeExercise';
import CharacterRecognizePractice from './CharacterRecognizePractice';
import SelectMode from './SelectMode';
import Home from './Home';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import HomeIcon from 'material-ui-icons/Home';
import IconButton from 'material-ui/IconButton';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { topics } from './lib/chinese';


class App extends Component {

  getLexicon(topic) {
    return topics.find((t) => t.name === topic).lexicon;
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <AppBar position="static">
            <Toolbar>
              <Link to='/'>
                <IconButton color="contrast">
                  <HomeIcon/>
                </IconButton>
              </Link>
              <Typography type="title" color="inherit">
                Learn Chinese Characters
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{flex:1}}>
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

        </div>
      </Router>
    );

  }
}

export default App;
