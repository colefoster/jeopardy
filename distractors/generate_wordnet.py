#!pip install nltk 
#import nltk
#nltk.download('wordnet') # <-- Uncomment these lines if you haven't downloaded wordnet before
from nltk.corpus import wordnet as wn


# Distractors from Wordnet
def get_distractors_wordnet(syn,word):
    distractors=[]
    word= word.lower()
    orig_word = word
    if len(word.split())>0:
        word = word.replace(" ","_")
    hypernym = syn.hypernyms()
    if len(hypernym) == 0: 
        return distractors
    for item in hypernym[0].hyponyms():
        name = item.lemmas()[0].name()
        #print ("name ",name, " word",orig_word)
        if name == orig_word:
            continue
        name = name.replace("_"," ")
        name = " ".join(w.capitalize() for w in name.split())
        if name is not None and name not in distractors:
            distractors.append(name)
    return distractors



def get_wordnet(word):
    syns = wn.synsets(word,'n')
    result = []
    if (len(syns)) == 0:
        result=[]
    elif(len(syns) == 1):
        result =  get_distractors_wordnet(syns[0],word)
    else:
        for syn in syns:
          result += get_distractors_wordnet(syn, word)

    return result

 

 