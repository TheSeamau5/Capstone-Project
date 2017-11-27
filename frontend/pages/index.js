import { Component } from 'react';

import AudioRecorderButton from '../components/AudioRecorderButton';

class IndexPage extends Component {

  onRecord(blob) {
    const formData = new FormData();

    formData.append('file', blob, 'audio.wav');

    fetch('http://127.0.0.1:5000/echo', {
      method: 'post',
      body: formData
    });

  }


  render() {
    return (
      <AudioRecorderButton onRecord={(blob) => this.onRecord(blob)}/>
    );
  }

}



export default IndexPage;
