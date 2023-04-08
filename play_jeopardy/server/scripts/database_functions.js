const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });


async function connectToDB(){
    //connect to the database
    try{
        console.log("Connecting to database...");
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        countGames();
        countUserQuestions();
        console.log("Connected to database\n\tReady to serve api requests on port " + process.env.PORT + "!");   
    }
    catch(err){
        console.log("Error connecting to database: " + err);
    }
}


const catSchema = new mongoose.Schema({
    id: Number,
    title: String,
    clues_count: Number,
    clue_ids: [Number]
});
const catModel = mongoose.model("jarchive_categories", catSchema);


const questionSchema = new mongoose.Schema({
    id: Number,
    clue: String,
    response: String,
    category: String,
    isDailyDouble: Boolean,
    round: String,
    value: Number,
    airdate: Date,
    game_id: Number,
    distractors: [String],

});
const questionModel = mongoose.model("jarchive_questions", questionSchema);


const userQuestionSchema = new mongoose.Schema({
    id: Number,
    clue: String,
    response: String,
    category: String,
    isDailyDouble: Boolean,
    round: String,  
    value: Number,
    distractors: [String],
    user_id: Number,
});
const userQuestionModel = mongoose.model("user_questions", userQuestionSchema);


const gameSchema = new mongoose.Schema({
    id: Number,
    seed: String,
    categories: [mongoose.Schema.Types.Mixed],
    questions: [[mongoose.Schema.Types.questionModel]],
    date: Date,
    score: Number,
    isComplete: Boolean,
});
const gameModel = mongoose.model("games", gameSchema);

let numGames = 0;
function countGames(){ //These count functions use a delayed state, they cant return the value immediately
    //because all async functions (including all mongoose functions) return a promise
    //This implementation calls the function on intial load, which counts the games, lets the promise resolve and updates the value
    //Since we are just running it to init it we dont care that the value is 0/wrong
    //After that it will return the correct value, counting (asynchronously and after the return) again each time it is called 
    gameModel.countDocuments({}, function(err, count){
        if(err){
            console.log(err);
        }
        else{
            if(count - numGames > 0){ 
                numGames = count;
            }
            else{
                numGames = count + 1;
            }
        }
    });
    return numGames;
}
function countCategories(){
    catModel.countDocuments({}, function(err, count){
        if(err){
            console.log(err);
        }
        else{
            return count;
        }
    });
}
let userQuestions = 0;
function countUserQuestions(){//necessary to determine id of new user questions, see above comment for details
    userQuestionModel.countDocuments({}, function(err, count){
        if(err){
            console.log(err);
        }
        else{
            if(count - numGames > 0){ 
                userQuestions = count;
            }
            else{
                userQuestions = count + 1;
            }
        }
    });
return userQuestions;
}

function removeDuplicateCategories(){
    console.log("Looking for duplicate categories...");
    //remove duplicate categories
    catModel.find({}, function(err, categories) {
        if (err) {
            console.log(err);
        } else {
            let category_ids = [];
            for (let i = 0; i < categories.length; i++) {
                if (category_ids.includes(categories[i].id)) {
                    //remove the category
                    catModel.deleteOne({id: categories[i].id}, function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Deleted duplicate category");
                        }
                    });
                } else {
                    category_ids.push(categories[i].id);
                }
            }
        }
    }); 
}
function removeDuplicateQuestions(){
    //remove duplicate questions
    console.log("Looking for duplicate questions...");
    questionModel.find({}, function(err, questions) {
        if (err) {
            console.log(err);
        } else {
            let question_ids = [];
            for (let i = 0; i < questions.length; i++) {
                if (question_ids.includes(questions[i].id)) {
                    //remove the question
                    questionModel.deleteOne({id: questions[i].id}, function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Deleted duplicate question, id: " + questions[i].id );
                        }
                    });
                } else {
                    question_ids.push(questions[i].id);
                    
                }
            }
        }
    });
}

module.exports = {countGames, countCategories ,countUserQuestions, connectToDB, gameModel, catModel, questionModel, userQuestionModel, countUserQuestions, removeDuplicateCategories, removeDuplicateQuestions};
