import React, { Component } from 'react';
import { wordPinyinEquivalent, transcribeVoice } from './lib/chinese';
import Button from 'material-ui/Button';
import MicIcon from 'material-ui-icons/Mic';

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
    this.startRecording();
    return transcribeVoice().then(
      (word) => this.recognize(word)
    ).then(
        () => this.stopRecording()
    );
  }

  renderButton() {
    const color = (!!this.state.isRecording) ? "secondary" : "primary";
    return (
      <Button fab color={color} onClick={() => this.onClick()}>
        {(!!this.state.isRecording) ? "..." : <MicIcon/>}
      </Button>
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
      <p style={{color: color}}>
        {this.props.character}
      </p>
    );
  }

  render() {
    return (
      <div>
        {this.renderCharacter()}
        {this.renderButton()}
      </div>
    );
  }
}

export default CharacterPage;
