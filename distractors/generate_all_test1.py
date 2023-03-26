import pymongo
import generate_wordnet 
import generate_conceptnet 
import generate_sense2vec 

from termcolor import colored, cprint
answer = input("Enter answer to generate distractors: ")
# Connect to the database
connection = pymongo.MongoClient("mongodb+srv://developer:pass@cluster1.eqlzj2v.mongodb.net/?retryWrites=true&w=majority")
db = connection["play_jeopardy"]
collection = db["questions"]
for x in collection.find():
    questionText = "Question: " +  x['question']
    answerText = "Answer: " + x['answer']
    print(questionText.center(30))
    print(answerText.center(30))

    w = ', '.join(generate_wordnet.get_wordnet(answer))
    c = ', '.join(generate_conceptnet.get_conceptnet(answer))
    s = ', '.join(generate_sense2vec.get_sense2vec(answer))
    red = colored(w, "red", attrs=["bold"])
    green = colored(c, "green", attrs=["bold"])
    blue = colored(s, "blue", attrs=["bold"])

    print(colored("WordNet", "red"))
    print (red)
    input("")
    print(colored("ConceptNet","green"))
    print(green)
    input("");

    print(colored("Sense2Vec","blue"))
    print(blue)


#
#   2. Figure out why WordNet/Others break on some (4th?) inputs
#   3. Figure out how to get the distractors to print in a nice format
#   4. Create new collection with distractors
#
#
#
#
#
   
    input("Press Enter to continue...")



