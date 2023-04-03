const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
async function connectToDB(){
    //connect to the database
    try{
        await mongoose.connect("mongodb+srv://root:pass@cluster0.1ia5fim.mongodb.net/play_jeopardy?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
        //await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to database");   
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

function countUserQuestions(){//necessary to determine id of new user questions
    userQuestionModel.countDocuments({}, function(err, count){
        if(err){
            console.log(err);
        }
        else{
            return count;
        }
    });

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

module.exports = {connectToDB, catModel, questionModel, userQuestionModel, countUserQuestions, removeDuplicateCategories, removeDuplicateQuestions};
