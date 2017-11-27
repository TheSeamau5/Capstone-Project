import io
import os

# Import the base64 encoding library.
import base64

# # Imports the Google Cloud client library
# from google.cloud import speech
# from google.cloud.speech import enums
# from google.cloud.speech import types

# Pass the audio data to an encoding function.
def encode_audio(audio):
  audio_content = audio.read()
  return base64.b64encode(audio_content)

file_name = os.path.join(
    os.path.dirname(__file__),
    'audio.flac'
)

with open(file_name, 'rb') as audio_file:
    print(encode_audio(audio_file))



# # Instantiates a client
# client = speech.SpeechClient()
#
# # The name of the audio file to transcribe
# file_name = os.path.join(
#     os.path.dirname(__file__),
#     'audio.flac')
#
# # Loads the audio into memory
# with io.open(file_name, 'rb') as audio_file:
#     content = audio_file.read()
#     audio = types.RecognitionAudio(content=content)
#
# config = types.RecognitionConfig(
#     encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
#     sample_rate_hertz=16000,
#     language_code='en-US')
#
# # Detects speech in the audio file
# response = client.recognize(config, audio)
#
# for result in response.results:
#     print('Transcript: {}'.format(result.alternatives[0].transcript))
