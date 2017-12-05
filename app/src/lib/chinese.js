import han from 'han';

// Function to compare if two characters are pinyin-equivalent
export function charactersPinyinEquivalent(char1, char2) {
  // Get list of possible pinyin representations for char1
  const pinyin1 = han.pinyin(char1)[0];

  // Get list of possible pinyin representations for char2
  const pinyin2 = han.pinyin(char2)[0];

  // Two characters are pinyin-equivalent if they share at least one
  // pinyin representation
  return pinyin1.some((x) => pinyin2.indexOf(x) >= 0)
}


// Function to compare if two words are pinyin-equivalent
export function wordPinyinEquivalent(word1, word2) {
  // Two words are pinyin-equivalent if all characters are pinyin-equivalent
  if (word1.length !== word2.length) {
    // If words are not of the same length, they can't be pinyin-equivalent
    return false;
  } else {
    const charlist1 = word1.split('');
    const charlist2 = word2.split('');

    return charlist1.every(
        (char1, index) => charactersPinyinEquivalent(char1, charlist2[index])
    );
  }
}

// Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const SpeechSynthesis = window.speechSynthesis;


// Function to get chinese voice
function getVoice() {
  const voices = SpeechSynthesis.getVoices();

  const betterVoice = voices.find(
    (voice) => voice.lang == 'zh-CN' && !voice.default
  );

  const fallbackVoice = voices.find(
    (voice) => voice.lang == 'zh-CN' && voice.default
  );

  return (!!betterVoice) ? betterVoice : fallbackVoice;
}


// Function to say words
export function say(word) {
  const voice = getVoice();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.voice = voice;
  utterance.rate = 0.7;
  return SpeechSynthesis.speak(utterance)
}



// Promise to transcribe from voice
export function transcribeVoice(language='zh-cn') {
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  recognition.lang = language;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return new Promise((resolve, reject) => {
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const word = event.results[last][0].transcript;
      resolve(word);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onnomatch = (event) => {
      reject('Sound not recognized');
    };

    recognition.onerror = (event) => {
      reject(event.error);
    };


    recognition.start();
  });
}
