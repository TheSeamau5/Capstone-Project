import React, { Component } from 'react';

import CharacterPage from './CharacterPage';


// props:
//  - lexicon: [string] (list of characters that form lexicon)
//  - onExerciseEnd: (score -> ())
class CharacterRecognizeExercise extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      currentTriesRemaining: 3,
      score: 0
    };
  }

  gotoNextCharacter() {
    if (this.state.currentIndex + 1 < this.props.lexicon.length) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }

  handleRecognize(isRecognized) {
    if (!isRecognized) {
      // If failed to recognize
      // If there are remaining tries, decrement current tries
      // Else, go to next character
      if (this.state.currentTriesRemaining > 0) {
        this.setState({
          currentTriesRemaining: this.state.currentTriesRemaining - 1
        })
      } else {
        this.gotoNextCharacter();
      }

    } else {
      // If succeeded, add to score and go to next character
      this.setState({
        currentTriesRemaining: 3,
        score: this.state.score + 10
      });
      this.gotoNextCharacter();
    }
  }

  renderCharacterPage() {
    const character = this.props.lexicon[this.state.currentIndex];

    return (
      <CharacterPage
        character={character}
        onRecognize={(isRecognized) => this.handleRecognize(isRecognized)}
      />
    );
  }


  render() {
    return (
      this.renderCharacterPage()
    );
  }
}

export default CharacterRecognizeExercise;
