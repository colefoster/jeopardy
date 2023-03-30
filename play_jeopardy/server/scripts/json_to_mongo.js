const fs = require('fs');
const mongoose = require("mongoose");
const he = require("he");
const { connectToDB, questionModel, catModel  } = require("./dbFunctions.js");
const prompt = require('prompt-sync')({sigint: true});

connectToDB();


let qCount = 0;


async function countQuestions(){
    console.log("finding all questions...")
    questionModel.find({}, function(err, questions) {
        
        if (err) {
            console.log(err);
        } else {
            qCount = questions.length;
            console.log("There are " + qCount + " questions in the database.");
        }
    });
    
}

let catCount = 0;
let categoriesProcessed = [];
async function countCategories(){
    console.log("finding all categories...")
    catModel.find({}, function(err, categories) {
        
        if (err) {
            console.log(err);
        } else {
            catCount  = categories.length;
            console.log("There are " + catCount + " categories in the database.");
            for(c in categories){
                if(!categoriesProcessed.includes(categories[c])){
                    categoriesProcessed.push(categories[c]);
                }
            }
            console.log("Learned which categories already exist to avoid adding duplicates...")
        }
    });
    
}



setTimeout(() => {upload();}, 69000);
setTimeout(() => {countQuestions();}, 100);
setTimeout(() => {countCategories();}, 200);



function upload(){
    let data = JSON.parse(fs.readFileSync("clues_Mar-28.json", 'utf8'));


    
   
    console.log("Starting at: " + qCount);
    

    prompt("Press enter to start the upload process...");
    
    for (let q = qCount; q < qCount + 100 && q < 463299; q++) {
        
        try{
            questionModel.find({id: q}, function(err, questions) {
                if (err) {
                    console.log(err);
                } else {
                    if(questions.length === 1){
                        console.log("Question already exists in database");
                    }
                    else if(questions.length > 1){
                        console.log("Error: more than one question with the same id");
                        for (let i = 1; i < questions.length; i++) {
                            questionModel.deleteOne({id: questions[i].id}, function(err) {
                                if(err) console.log(err);

                                console.log("Deleted question: " + question[i].id);
                            });
                        }
                    }
                    else if(questions.length === 0){

                        try{
                            let question = new questionModel({
                                id : q,
                                clue : he.decode(data[q].clue),
                                response : he.decode(data[q].response),
                                category : data[q].category,
                                round : getRound(data[q].round),
                                value : data[q].value,
                                isDailyDouble: data[q].isDailyDouble,
                                airdate : data[q].airDate,
                                game_id : data[q].gameId,
                                distractors : []
                            });
                            try{
                                saveQuestion(question);
                            }
                            catch(err){
                                console.log("Error saving question to database: " + err);
                            }
                            try{
                                if(categoriesProcessed.includes(data[q].category)){
                                    catModel.updateOne({title: data[q].category},{$push :{clue_ids:q}, $inc: {clues_count: 1}}, function(err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("updated existing category: " + (data[q].category));                                       }
                                    });
                                    
                                }
                                else{
                                    let category = new catModel({
                                        id : catCount++,
                                        title : data[q].category,
                                        clues_count : 1,
                                        clue_ids: [q]
                                    });
                                    categoriesProcessed.push(data[q].category);

                                    console.log("Created new category: " + (data[q].category));
            
                                    try{
                                        saveCategory(category);
                                    }
                                    catch(err){
                                        console.log("Error saving category to database: " + err);
                                    }
                                }
                            }
                            catch(e){
                                console.log("Error parsing category: from question: " +data[q]);
                                console.log(e)
                            }
                        }
                        catch(e){
                            console.log("Question " + q + " was blank");
                        }
                        
                        
                        
                    }
                }
            });
        }
        
        catch(err){
            console.log(err);
            console.log("Error parsing question: " + q);
            console.log(data[q]);
        }
        
        
    }
}


function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

function getRound(round){
    if (round === "j") return "Jeopardy";
    else if (round === "dj") return "Double Jeopardy";
    else if (round === "fj") return "Final Jeopardy";
    else return "Unknown";
}

async function saveQuestion(question){
    //save categories to the database
    try{
        await question.save();
        console.log("Saved new Question :" + question.id);
    }
    catch(err){
        console.log("Error saving question to database: " + err);
    }
}

async function saveCategory(category){
    //save categories to the database
    try{
        await category.save();
        console.log("Saved new Category:" + category.id );
    }
    catch(err){
        console.log("Error saving category to database: " + err);
    }
}