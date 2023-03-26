const { connectToDB, questionModel } = require("./dbFunctions.js");
const utf8 = require('utf8');
const prompt = require("prompt-sync")();
const fs = require('fs');

connectToDB();

questionModel.find({}, function(err, questions) {
    if (err) {
        console.log(err);
    } else {
        let changes = 0;
        let considered = 0;
        let notConsidered = 0;
        for(q in questions){
            let original = questions[q];
            
            try{
                fs.writeFileSync("../temp/utf.txt", JSON.stringify(original), 'utf-8');
                
                let utf = JSON.parse(fs.readFileSync("u.txt", 'utf-8'));

                questions[q].question = utf["question"];
                questions[q].answer = utf["answer"];
                questions[q].save(function (err){
                    if(err){
                        console.log("Error saving question: " + err);
                    }   
                    else{
                        console.log("Question saved!");
                    }
                });

               
            }catch(err){
                console.log("Error: " + err);
                console.log("Could not convert: " + original["question"] + " | " + original["answer"]);
            }
            

            
        }
        console.log("FINSIHED!");
        console.log("Changes made: " + changes);
        console.log("Considered: " + considered);
        console.log("Not considered: " + notConsidered);
    }
});
