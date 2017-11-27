from flask import Flask

from chinese import extract_pinyin
from transcribe import recognize

application = Flask(__name__)

@application.route('/')
def main_route():
    result = recognize(pinyin=True)
    return result


if __name__ == '__main__':
    application.run(debug=True)
