import { Component } from 'react';
import AudioRecorder from '../components/AudioRecorder';


class AudioRecorderButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isRecording: false
    };
  }

  record() {
    this.setState({
      isRecording: !this.state.isRecording
    });
  }

  render() {
    return (
      <div>
        <AudioRecorder record={this.state.isRecording}/>
        <button onClick={() => this.record()}>
          {!this.state.isRecording ? 'Start' : 'Stop'}
        </button>
      </div>
    );
  }


}



export default AudioRecorderButton;
