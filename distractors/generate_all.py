import pymongo
import generate_wordnet 
import generate_conceptnet 
import generate_sense2vec 

from termcolor import colored, cprint

# Connect to the database
connection = pymongo.MongoClient("mongodb+srv://developer:pass@cluster1.eqlzj2v.mongodb.net/?retryWrites=true&w=majority")
db = connection["play_jeopardy"]
collection = db["questions"]
for x in collection.find():
    questionText = "Question: " +  x['question']
    answerText = "Answer: " + x['answer']
    print(questionText.center(30))
    print(answerText.center(30))

    w = ', '.join((generate_wordnet.get_wordnet(x['answer'])))
    c = ', '.join(generate_conceptnet.get_conceptnet(x['answer']))
    s = ', '.join(generate_sense2vec.get_sense2vec(x['answer']))
    red = colored(w, "red", attrs=["bold"])
    green = colored(c, "green", attrs=["bold"])
    blue = colored(s, "blue", attrs=["bold"])

    print(colored("WordNet", "red"))
    print (red)
    print(colored("ConceptNet","green"))
    print(green)
    print(colored("Sense2Vec","blue"))
    print(blue)

   
    input("Press Enter to continue...")



