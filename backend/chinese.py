from snownlp import SnowNLP

def extract_pinyin(word):
    return SnowNLP(word).pinyin
