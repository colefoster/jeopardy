const https = require("https");

const mongoose = require("mongoose");

async function connectToDB(){
    //connect to the database
    try{
        await mongoose.connect("mongodb+srv://admin:cl4HTS2dcCu9fGvG@cluster1.eqlzj2v.mongodb.net/play_jeopardy?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to database");
    }
    catch(err){
        console.log("Error connecting to database: " + err);
    }
}


const catSchema = new mongoose.Schema({
    id: Number,
    title: String,
    clues_count: Number
});
const catModel = mongoose.model("category", catSchema);
const questionSchema = new mongoose.Schema({
    id: Number,
    answer: String,
    question: String,
    value: Number,
    airdate: Date,
    category_id: Number,
    game_id: Number,
    category: {
        id: Number,
        title: String,
        clues_count: Number
    }

});
const questionModel = mongoose.model("question", questionSchema);


async function saveCategory(category){
    //save categories to the database
    try{
        await category.save();
        //console.log("Saved category to database");
    }
    catch(err){
        console.log("Error saving category to database: " + err);
    }
}

async function saveQuestion(question){
    //save categories to the database
    try{
        await question.save();
        //console.log("Saved question to database");
    }
    catch(err){
        console.log("Error saving question to database: " + err);
    }
}
function getCategories(count = 1, offset = 0){ 
    https
  .get(`https://jservice.io/api/categories?count=${count}&offset=${offset}`, resp => {
    let data = "";
    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
        let url = '';
        try{
            url = JSON.parse(data);
        }
        catch(e){
            console.log("Error parsing JSON: " + e);
            console.log(data);
        }
        
      for(let i = 0; i < url.length; i++){
        //Does the category already exist in the database?
        catModel.find({id: url[i].id}, (err, result) => { 
            if (err){
                console.log(err)
            }else if(result.length > 0){
                console.log("Category already exists");
                
            }
            else{
                let category = new catModel({
                    id: url[i].id,
                    title: url[i].title,
                    clues_count: url[i].clues_count
                });
                saveCategory(category);
                getQuestionFromCategory(category.id);
            }             
        });
      }
      
      
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });

}

function getQuestionFromCategory(category_id){

    https.get(`https://jservice.io/api/clues?category=${category_id}`, resp => {
        let data = "";
        // A chunk of data has been recieved.
        resp.on("data", chunk => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
            let questions = '';
            try{
                questions = JSON.parse(data);
            }
            catch(e){
                console.log("Error parsing JSON: " + e);
                console.log(data);
            }

            Object.keys(questions).forEach(function(key) {
                //check if the question already exists in the database
                questionModel.find({id: questions[key].id}, (err, result) => {
                    if (err){
                        console.log(err)
                    }else if(result.length > 0){
                        console.log("Question already exists");
                        return;
                    }
                    else{
                        let question = new questionModel({
                            id: questions[key].id,
                            answer: questions[key].answer,
                            question: questions[key].question,
                            value: questions[key].value,
                            airdate: questions[key].airdate,
                            category_id: questions[key].category_id,
                            game_id: questions[key].game_id,
                            category: {
                                id: questions[key].category.id,
                                title: questions[key].category.title,
                                clues_count: questions[key].category.clues_count
                                }                       
                            });
                            saveQuestion(question);
                    }
                });
                
            });           
        });
    })
    
};
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

module.exports = {connectToDB, getCategories, removeDuplicateCategories, removeDuplicateQuestions, catModel, questionModel};
