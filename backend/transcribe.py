import io
import os
import json

# Import the base64 encoding library.
import base64

# Import the requests package (simple HTTP requests)
import requests

# # Imports the Google Cloud client library
# from google.cloud import speech
# from google.cloud.speech import enums
# from google.cloud.speech import types

# Pass the audio data to an encoding function.
def encode_audio(audio_file):
  audio_content = audio_file.read()
  return base64.b64encode(audio_content)

file_name = os.path.join(
    os.path.dirname(__file__),
    'audio.flac'
)

# with open(file_name, 'rb') as audio_file:
#     print(encode_audio(audio_file))

__GOOGLE_SPEECH_RECOGNIZE_URL = 'https://speech.googleapis.com/v1/speech:recognize'
__API_KEY = 'AIzaSyB_xdqBYSPUuvpBQuvOxhd6XJExhpNEJkE'

def send_google_speech_recognize_request(file_name):
    with open(file_name, 'rb') as audio_file:
        base64_audio = encode_audio(audio_file)
        response = requests.post(__GOOGLE_SPEECH_RECOGNIZE_URL, data=json.dumps({
            'config': {
                'encoding': 'FLAC',
                'sampleRateHertz': 16000,
                'languageCode': 'zh-Hans'
            },
            'audio': {
                'content': base64_audio
            }
        }), params={'key': __API_KEY})
        print(response.url)
        return response.json()

# print(send_google_speech_recognize_request(file_name))

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
