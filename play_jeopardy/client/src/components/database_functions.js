const mongoose = require("mongoose"); //Only using mongoose as a means to store objects that will be compatible with 
                                        //The server/db side (because I copied and pasted them from there)


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


module.exports = { catModel, questionModel, userQuestionModel };
