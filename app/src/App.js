import React, { Component } from 'react';
import CharacterPage from './CharacterPage';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className='App'>
        <CharacterPage character='为什么'/>
      </div>

    );

  }
}

export default App;
