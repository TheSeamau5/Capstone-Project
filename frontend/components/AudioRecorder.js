import { Component } from 'react';
/*
props:
  - record: Boolean
  - onRecord : Blob -> ()
*/
class AudioRecorder extends Component {

  constructor(props) {
    super(props);
  }

  setup(stream) {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      this.addDataChunk(event.data);
    };

    mediaRecorder.onstop = (event) => {
      const blob = new Blob(this.state.dataChunks, { 'type' : 'audio/ogg; codecs=opus' });
      if (!!this.props.onRecord) {
        this.props.onRecord(blob);
      }
      this.clearDataChunks();
    };

    this.setState({
      mediaRecorder: mediaRecorder,
      dataChunks:[]
    });

  }

  componentDidMount() {
    navigator.getUserMedia({
      audio: true
    }, (stream) => {
      this.setup(stream);
    }, (err) => {
      console.error(err);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.record !== this.props.record) {
      this.record(nextProps.record);
    }
  }

  addDataChunk(data) {
    this.setState({
      dataChunks: this.state.dataChunks.concat([data])
    });
  }

  clearDataChunks() {
    this.setState({
      dataChunks:[]
    });
  }

  getMediaRecorder() {
    return this.state.mediaRecorder;
  }

  record(startRecording=true) {
    if (startRecording) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    const mediaRecorder = this.getMediaRecorder();
    mediaRecorder.start();
  }

  stop() {
    const mediaRecorder = this.getMediaRecorder();
    mediaRecorder.stop();
  }

  render() {
    return null;
  }
}

AudioRecorder.defaultProps = {
  record: false
};

export default AudioRecorder;
