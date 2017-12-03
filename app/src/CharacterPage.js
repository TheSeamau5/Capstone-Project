import React, { Component } from 'react';
import { wordPinyinEquivalent, transcribeVoice } from './lib/chinese';
import Button from 'material-ui/Button';
import MicIcon from 'material-ui-icons/Mic';

import './CharacterPage.css';

class CharacterPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isRecognized: null,
      isRecording: false
    };
  }

  recognize(character) {
    return this.setState({
      isRecognized: wordPinyinEquivalent(this.props.character, character)
    });
  }

  startRecording() {
    return this.setState({
      isRecording: true
    });
  }

  stopRecording() {
    return this.setState({
      isRecording: false
    });
  }

  onClick() {
    if (!this.state.isRecording) {
      this.startRecording();
      return transcribeVoice().then(
        (word) => this.recognize(word)
      ).then(
          () => this.stopRecording()
      );
    } else {
      this.stopRecording();
    }
  }

  renderButton() {
    const color = (!!this.state.isRecording) ? "secondary" : "primary";
    return (
      <div className='buttonContainer'>
        <Button
          fab
          color={color}
          onClick={() => this.onClick()}
        >
          {(!!this.state.isRecording) ? "..." : <MicIcon/>}
        </Button>
      </div>

    );
  }

  renderCharacter() {
    const color = (() => {
      if (this.state.isRecognized === null) {
        return 'gray';
      } else if (!!this.state.isRecognized) {
        return 'green';
      } else {
        return 'red';
      }
    })();

    return (
      <div className='characterContainer'>
        <p style={{color: color}}>
          {this.props.character}
        </p>
      </div>

    );
  }

  render() {
    return (
      <div className='CharacterPage'>
        {this.renderCharacter()}
        <div className='separator'></div>
        {this.renderButton()}
      </div>
    );
  }
}

export default CharacterPage;
