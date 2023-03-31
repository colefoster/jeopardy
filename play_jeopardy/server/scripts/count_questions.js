const { connectToDB, questionModel } = require("./database_functions.js");
const fs = require('fs');



setTimeout(() => { connectToDB();}, 10) ;
setTimeout(() => {countQuestions();}, 9000);

function countQuestions(){
    questionModel.find({}, function(err, questions) {
        if (err) {
            console.log(err);
        } else {
            console.log(questions.length);
            
        }
    });
}