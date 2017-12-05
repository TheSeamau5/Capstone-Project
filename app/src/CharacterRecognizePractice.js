import React, { Component } from 'react';

import { wordPinyinEquivalent, transcribeVoice } from './lib/chinese';

import Character from './Character';

import Button from 'material-ui/Button';
import MicIcon from 'material-ui-icons/Mic';


// Component used for practice runs.
// Does not record scores, just loops through characters
class CharacterRecognizePractice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Current character index of lexicon
      currentIndex: 0,

      // Microphone is recording
      isRecording: false,

      // Character is recognized correctly (null if not yet attempted)
      isRecognized: null
    };
  }

  ////////////////////
  // Getter methods //
  ////////////////////
  getCurrentCharacter() {
    return this.props.lexicon[this.state.currentIndex];
  }

  ////////////////////
  // Setter methods //
  ////////////////////
  recognize(character) {
    return this.setState({
      isRecognized: wordPinyinEquivalent(this.getCurrentCharacter(), character)
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

  gotoNext() {
    return this.setState({
      currentIndex: (this.state.currentIndex + 1) % this.props.lexicon.length,
      isRecording: false,
      isRecognized: null
    });
  }

  ///////////////////////////
  // Event Handler methods //
  ///////////////////////////
  onGotoNext() {
    return this.gotoNext();
  }

  onRecord() {
    if (!!this.state.isRecording) {
      return this.stopRecording();
    } else {
      this.startRecording();

      return transcribeVoice().then(
        (word) => this.recognize(word)
      ).then(
          () => this.stopRecording()
      ).catch(
        (error) => this.stopRecording()
      );
    }
  }

  ////////////////////
  // Render methods //
  ////////////////////
  renderCharacter() {
    // Method to render the current character
    const character = this.getCurrentCharacter();

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
      <Character color={color}>
        {character}
      </Character>
    );
  }

  renderGotoNextButton() {
    // Method to render go to next button
    return (
      <Button className='nextButton' raised color="accent" onClick={() => this.onGotoNext()}>
        Next
      </Button>
    );
  }

  renderRecordButton() {
    // Method to render record button
    return (
      <Button
        fab
        color={(!!this.state.isRecording) ? "secondary" : "primary"}
        onClick={() => this.onRecord()}
      >
        {(!!this.state.isRecording) ? "..." : <MicIcon/>}
      </Button>
    );
  }

  renderActions() {
    // Method to render action buttons
    return (
      <div className='actionsArea'>
        <div style={{flex: 1}}></div>
        {this.renderRecordButton()}
        <div style={{flex: 1}}></div>
        {this.renderGotoNextButton()}
        <div style={{flex: 1}}></div>
      </div>
    );
  }


  render() {
    // Top area has the score and number of attempts remaining
    // Center area has the character
    // Bottom area has the action buttons
    return (
      <div className='CharacterRecognizePractice'>
        {this.renderCharacter()}
        {this.renderActions()}
      </div>
    );
  }
}

export default CharacterRecognizePractice;
