from flask import Flask
from flask_cors import CORS

from chinese import extract_pinyin
from transcribe import recognize

application = Flask(__name__)
CORS(application)

@application.route('/')
def main_route():
    result = recognize(pinyin=True)
    return result


@application.route('/echo', methods=['POST'])
def echo():
    print('Echo')
    return 'Echo'

if __name__ == '__main__':
    application.run(debug=True)
