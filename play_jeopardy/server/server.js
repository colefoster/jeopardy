const express = require("express");
const app = express();
const cors = require("cors");
var Alea = require('alea')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {gameModel, catModel, questionModel, userQuestionModel, countGames, connectToDB, countUserQuestions} = require("./scripts/database_functions.js");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const categoryLimit = Number(process.env.CATEGORY_LIMIT);
const questionLimit = Number(process.env.QUESTION_LIMIT);

app.use(cors());
app.use(express.json());



// play_jeopardy REST API
app.get("/api/game", (req, res) => {
  generateGame(req, res);
});

app.get("/api/questions/", (req, res) => {
  console.log(req.query);
  searchQuestions(req, res);
});

app.get("/api/categories", (req, res) => {
  searchCategory(req, res);
});

app.get("/api/userquestions", (req, res) => {
  searchUserQuestions(req, res);
});

app.post("/api/userquestions", (req, res) => {
  addUserQuestion(req, res);
});

app.put("/api/userquestions", (req, res) => {
  updateUserQuestion(req, res);
});

app.get("/favicon.ico", (req, res) => {
  res.send("./public/favicon.ico");
});
    
app.get("/api/isregexenabled/", (req, res) => {
  if(process.env.REGEX_SANITIZATION_ENABLED === true){
    res.status(204).send(); //No regex because sanitization is enabled
  }
  else{
    res.status(200).send(); //Yes regex is enabled
  }
});

app.listen(port, () => {
  connectToDB();
});

async function generateGame(req, res) {
  
  nCats = Number(process.env.GAME_SIZE_CATEGORIES) || 6;
  nQs = Number(process.env.GAME_SIZE_QUESTIONS) || 5;
  
  let seed = req.query.seed || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  var rng = new Alea(seed);

  
  await catModel.find({$and: [{$or: [{id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)},{id: Math.floor(rng() * 78176)},
  {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)},
  {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)},
  {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}, {id: Math.floor(rng() * 78176)}]}, 
  {clues_count: {$gte: nQs}}]}, function(err, categories) {
    if (err){
      console.log(err);
    }
  }).limit(nCats)
  .then(function(categories){
    let tempQsArray = [];
    for (let i = 0; i < categories.length; i++){
      try{  //if there are nQs questions in the category, grab them all
        if(categories[i].clues_count === nQs){//(This line is getting empty tempCats[i] objects)
          questionModel.find({category: categories[i].title}, function(err, questions_group_of_nQs) {
            if (err){
              console.log(err);
            }
            
          }).sort({value: 1}).limit(nQs).then( function(questions_group_of_nQs){
            
            tempQsArray.push(questions_group_of_nQs);
            //console.log("Pushing question to tempQsArray: " + questions_group_of_nQs + "")
            if(tempQsArray.length === nCats){
              //console.log("TempQsArray: " + tempQsArray + "");
              let newGame = new gameModel({
                id: countGames(),
                seed: seed,
                categories: categories,
                questions: tempQsArray,
                date: Date.now(),
                score: 0,
                isComplete: false
              });
              res.send(newGame);
              newGame.save(function(err, newGame){
                if(err){
                  console.log(err);
                }
                else{
                  let c = "";
                  for(let i = 0; i < newGame.categories.length; i++){
                    c += newGame.categories[i].title + ", ";
                  }
                  console.log("Game " + newGame.id + " (" + c + ") generated and saved.");
                }
              });
            }
          });
        }
        else{ //else if more than nQs questions in category, grab one of each value, selecting randomly if there are multiple questions with the same value 
          
          
          let targetValue = 0;
          let subArray = [];
          for(let j = 0; j < nQs; j++){
            targetValue = ((j%5)+1) * 200;
            questionModel.find({$and:[{category: categories[i].title}, {$or:[{ value: targetValue}, {$and:[{value:targetValue + targetValue}, {round:"Double Jeopardy"}]}]}]}, function(err, qs_specific_values) {
              if (err){
                console.log(err);
              }
            }).then(function(qs_specific_values){
              subArray.push(qs_specific_values[Math.floor(rng() * qs_specific_values.length)]);
              if(subArray.length === nQs){
                tempQsArray.push(subArray);
                if(tempQsArray.length === nCats){
                  let newGame = new gameModel({
                    id: countGames(),
                    seed: seed,
                    categories: categories,
                    questions: tempQsArray,
                    date: Date.now(),
                    score: 0,
                    isComplete: false
                  });
                  res.send(newGame);
                  newGame.save(function(err, newGame){
                    if(err){
                      console.log(err);
                    }
                    else{
                      let c = "";
                      for(let i = 0; i < newGame.categories.length; i++){
                        c += newGame.categories[i].title + ", ";
                      }
                      console.log("Game " + newGame.id + " (" + c + ") generated and saved.");
                    }
                  });
                }
              }
            });
          }
          
        }
      }
      catch(err){
        console.log("Error in generating game");
        console.log(err);
      }
    }
  });  
}

function searchQuestions(req, res) {
  try{
    questionModel.find({$and: [
      {clue: (req.query.question) ?  { $regex: sanitize(req.query.question), $options: "i" } : {$regex: ".*"} }, // no question query parameter    
      {response: (req.query.answer) ?  { $regex: sanitize(req.query.answer), $options: "i" }: {$regex: ".*"}}, // answer query parameter
      {category: (req.query.category) ?  {$regex: sanitize(req.query.category), $options: "i" }: {$regex: ".*"}}, // no category query parameter
      {value: (!req.query.value|| req.query.value.length === 1 ) ? {$gte: 0} :  req.query.value}, // no value query parameter or ANY value query parameter
      {round: (!req.query.round || req.query.round.length === 3 ) ? {$regex: ".*"}:  req.query.round}, // no round query parameter, or ANY round query parameter
      (!req.query.isDailyDouble || req.query.isDailyDouble.length === 3) ? {$or :[{isDailyDouble: true},{isDailyDouble: false}]} :{isDailyDouble: req.query.isDailyDouble}]},
      function(err, questions) {
        if (err) {
          console.log(err);
        } else {
          if(questions.length === 0){
            questionModel.find({value: -1}, function(err, placeholder) {
              if (err) {
                console.log(err);
              } else {
                res.send(placeholder);
              }
            });
          }else{
            res.send(questions);
          }       
        }
      })
      .sort(req.query.sort)
      .limit(questionLimit);
    }catch(err){
      console.log(err);
    }
  
}

function searchCategory(req, res) {
  catModel.find({$and: [
    (req.query.title.length === 0 ) ? 
    {title: {$regex: ".*"}} // no title query parameter
     : {title: {$regex: sanitize(req.query.title), $options: "i" }},

    (req.query.countMin.length === 0 ) ?
    {clues_count: {$gte: 0}}  // no countMin query parameter
     : {clues_count: {$gte: (Number(req.query.countMin))}},


     (req.query.countMax.length === 0 ) ?
     {clues_count: {$lte: 1000}}  // no countMax query parameter
      : {clues_count: {$lte: (Number(req.query.countMax))}}]},
    function(err, questions) {
      if (err) {
        console.log(err);
      } 
      else {
        res.send (questions);
      }
    }).limit(categoryLimit)
    .sort(req.query.sort);  
}

function searchUserQuestions(req, res) {
  console.log(req.query);
  userQuestionModel.find({
    $and: [
      {clue: (req.query.question) ?  { $regex: sanitize(req.query.question), $options: "i" } : {$regex: ".*"} }, // no question query parameter
      {response: (req.query.answer) ?  { $regex: sanitize(req.query.answer), $options: "i" }: {$regex: ".*"}}, // answer query parameter
      {category: (req.query.category) ?  {$regex: sanitize(req.query.category), $options: "i" }: {$regex: ".*"}}, // no category query parameter
      {value: (!req.query.value|| req.query.value.length === 1 ) ? {$gte: 0} :  req.query.value}, // no value query parameter or ANY value query parameter
      {round: (!req.query.round || req.query.round.length === 3 ) ? {$regex: ".*"}:  req.query.round}, // no round query parameter, or ANY round query parameter
      (!req.query.isDailyDouble || req.query.isDailyDouble.length === 3) ? {$or :[{isDailyDouble: true},{isDailyDouble: false}]} :{isDailyDouble: req.query.isDailyDouble},
    ]
  },
    function(err, questions) {
      console.log(questions.length);
      if (err) {
        console.log(err);
      } else {
        if(questions.length === 0){
          res.send([]);
        }
        else{

          res.send(questions);
        }
      }
    })
    .sort(req.query.sort)
    .limit(questionLimit);
}

function addUserQuestion(req, res) {
  const userQuestion = new userQuestionModel({
    id:countUserQuestions+1,
    clue: req.body.question,
    response: req.body.answer,
    category: req.body.category,
    value: req.body.value,
    round: req.body.round,
    distractors: req.body.distractors,
    isDailyDouble: req.body.isDailyDouble,
    user_id: req.body.user_id
  });
  userQuestion.save(function (err, userQuestion) {
    if (err){
      console.log(err);
      return res.status(500).send();
    } 
    else{
      console.log("User Question Saved");
      return res.status(201).send();
    }
  });
}
  
function updateUserQuestion(req, res){
  userQuestionModel.updateOne({_id: req.body._id},
    {
      clue:req.body.question,
      response:req.body.answer,
      category:req.body.category,
      value:req.body.value,
      round:req.body.round,
      distractors:req.body.distractors,
      isDailyDouble:req.body.isDailyDouble,
      user_id:req.body.user_id
    },
    function(err, question) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log("Update Question Successful");
        res.status(201).send();
      }
    }
  );
}

function sanitize(str) {
  if (process.env.REGEX_SANITIZATION_ENABLED === "false"){
    return str; 
  }
  else{
    
    if (typeof str !== "string") return ".*";
    
    return str.replaceAll("[-.\\+*?\\[^\\]$(){}=!<>|:\\\\]", "\\\\$0");
  }
}

