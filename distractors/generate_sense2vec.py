#!pip install sense2vec==1.0.2
#!wget https://github.com/explosion/sense2vec/releases/download/v1.0.0/s2v_reddit_2015_md.tar.gz
#!tar -xvf  s2v_reddit_2015_md.tar.gz

# load sense2vec vectors
from sense2vec import Sense2Vec
s2v = Sense2Vec().from_disk('s2v_old')

from collections import OrderedDict
def get_sense2vec(word):
    output = []
    word = word.lower()
    word = word.replace(" ", "_")

    sense = s2v.get_best_sense(word)
    most_similar = s2v.most_similar(sense, n=20)

    for each_word in most_similar:
        append_word = each_word[0].split("|")[0].replace("_", " ").lower()
        if append_word.lower() != word:
            output.append(append_word.title())

    out = list(OrderedDict.fromkeys(output))
    return out

