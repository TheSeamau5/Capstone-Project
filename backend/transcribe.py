import os
import json

# Import the base64 encoding library.
import base64

# Import the requests package (simple HTTP requests)
import requests

# Import local chinese package
import chinese

# Constants
__GOOGLE_SPEECH_RECOGNIZE_URL = 'https://speech.googleapis.com/v1/speech:recognize'
__API_KEY = 'AIzaSyB_xdqBYSPUuvpBQuvOxhd6XJExhpNEJkE'


# Test file name while waiting for frontend to be implemented
__TEST_FILE_NAME = os.path.join(
    os.path.dirname(__file__),
    'audio.flac'
)

# File to base64 encode audio file
def base64_encode_audio_file(file_name):
    with open(file_name, 'rb') as audio_file:
        audio_content = audio_file.read()
        return base64.b64encode(audio_content)


def send_google_speech_recognize_request(content, encoding='FLAC',
                                         sampleRateHertz=16000,
                                         languageCode='zh-Hans'):
    response = requests.post(__GOOGLE_SPEECH_RECOGNIZE_URL, data=json.dumps({
        'config': {
            'encoding': encoding,
            'sampleRateHertz': sampleRateHertz,
            'languageCode': languageCode
        },
        'audio': {
            'content': content
        }
    }), params={'key': __API_KEY})
    return response.json()


# Recognize characters from sound
def recognize(file_name=__TEST_FILE_NAME, pinyin=False):
    base64_audio = base64_encode_audio_file(file_name)
    response = send_google_speech_recognize_request(content=base64_audio)
    print(response)
    result = response['results'][0]['alternatives'][0]['transcript']
    if not pinyin:
        return result
    else:
        return ' '.join(chinese.extract_pinyin(result))
