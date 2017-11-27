from flask import Flask

from chinese import extract_pinyin
from transcribe import file_name, send_google_speech_recognize_request

application = Flask(__name__)

@application.route('/')
def main_route():
    response = send_google_speech_recognize_request(file_name)
    result = response['results'][0]['alternatives'][0]['transcript']
    return ' '.join(extract_pinyin(result))


if __name__ == '__main__':
    application.run(debug=True)
