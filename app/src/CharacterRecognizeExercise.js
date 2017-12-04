import React, { Component } from 'react';

import { wordPinyinEquivalent, transcribeVoice } from './lib/chinese';

import Character from './Character';

import Button from 'material-ui/Button';
import MicIcon from 'material-ui-icons/Mic';

import './CharacterRecognizeExercise.css';

// props:
//  - lexicon: [string] (list of characters that form lexicon)
//  - maxTries : int (default: 3)
//  - onExerciseEnd: (score -> ())
class CharacterRecognizeExercise extends Component {

  constructor(props) {
    super(props);


    // The game progresses by first showing a character with a
    // microphone button. When the microphone button is pressed,
    // the microphone is recording a sound. When it is done, it either
    // succeeds or fails. The player can try up to 3 times, after which
    // The player is asked to go to the next page and is offered a
    // button to hear what the character sounds like.
    // When game reaches end, player is shown score.
    this.state = {
      // Current character index of lexicon
      currentIndex: 0,

      // Number of tries remaining
      currentTriesRemaining: 2,

      // Current player score
      score: 0,

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
    console.log(character);
    const isRecognized = wordPinyinEquivalent(this.getCurrentCharacter(), character);
    console.log(isRecognized);
    const currentTriesRemaining = !!isRecognized ? 2 : this.state.currentTriesRemaining - 1;

    const score = !!isRecognized ? this.state.score + 4 + (3 * this.state.currentTriesRemaining) : this.state.score;

    return this.setState({
      isRecognized,
      currentTriesRemaining,
      score
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
    if (this.state.currentIndex + 1 < this.props.lexicon.length) {
      return this.setState({
        currentIndex: this.state.currentIndex + 1,
        isRecording: false,
        isRecognized: null
      });
    } else if (!!this.props.onExerciseEnd){
      return this.props.onExerciseEnd(this.state.score);
    }
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
  renderMetrics() {
    // Method to render the current metrics for the game
    return (
      <div className='metricsContainer'>
        <p>Score: {this.state.score}</p>
        <p>Attempts Remaining: {this.state.currentTriesRemaining}</p>
      </div>
    );
  }

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
    const content = (() => {
      // If character is recognized or if attempts are over, render next button
      // Else, render microphone.
      if (!!this.state.isRecognized || this.state.currentTriesRemaining < 0) {
        return this.renderGotoNextButton();
      } else {
        return this.renderRecordButton();
      }
    })();


    return (
      <div className='actionsArea'>
        {content}
      </div>
    );


  }


  render() {
    // Top area has the score and number of attempts remaining
    // Center area has the character
    // Bottom area has the action buttons
    return (
      <div className='CharacterRecognizeExercise'>
        {this.renderMetrics()}
        {this.renderCharacter()}
        {this.renderActions()}
      </div>
    );
  }
}

export default CharacterRecognizeExercise;
