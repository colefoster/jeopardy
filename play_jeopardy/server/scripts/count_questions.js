const { connectToDB, questionModel } = require("./dbFunctions.js");
const fs = require('fs');

let data = JSON.parse(fs.readFileSync("clues.json", 'utf8'));
connectToDB();
setTimeout(() => {findFromDB();}, 5000);
function findFromDB(){
    questionModel.find({}, function(err, questions) {
        
        if (err) {
            console.log(err);
        } else {
            qCount = questions.length;
            console.log("There are " + qCount + " questions in the database.");
            for(let q = qCount; q < qCount + 100;q++){
                try{
                    questions[q].airdate = data[q].airDate;
                    setTimeout(() => {saveQuestion(questions[q]);},1);
                    console.log(q);
                }
                catch(e){
                    console.log("Error saving question " + q)
                    console.log(e);
    
                }
                
            }
            
        }
    });
    console.log("Done");
}


async function saveQuestion(question){
    //save categories to the database
    try{
        await question.save();
        console.log("Saved Question :" + question.id);
    }
    catch(err){
        console.log("Error saving question to database: " + err);
    }
}