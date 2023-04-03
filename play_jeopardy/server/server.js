const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {catModel, questionModel, userQuestionModel, connectToDB, countUserQuestions} = require("./scripts/database_functions.js");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const categoryLimit = Number(process.env.CATEGORY_LIMIT);
const questionLimit = Number(process.env.QUESTION_LIMIT);

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection

app.get("/", (req, res) => {
  
  res.send("Hello World!");
});


// play_jeopardy REST API
app.get("/api/questions/", (req, res) => {
  searchQuestions(req, res);
  
});


app.get("/api/categories", (req, res) => {
  searchCategory(req, res);
});

app.get("/api/userquestions", (req, res) => {
  searchUserQuestions(req, res);
});

app.post("/api/userquestions", (req, res) => {
  console.log(req.body);
  addUserQuestion(req, res);
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


function searchQuestions(req, res) {
  console.log(req.query)
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
            console.log("No questions found");
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
  console.log(req.query.question);
  console.log(Boolean(req.query.question));

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
    id:countUserQuestions(),
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
      return res.status(200).send();
    }
  });
}
  
function updateUserQuestion(req, res){
  let q = userQuestionModel.findOne({id: req.body.id});
  if(req.body.question){
    q.clue=req.body.question;
  }
  if(req.body.answer){
    q.response=req.body.answer;
  }
  if(req.body.category){
    q.category=req.body.category;
  }
  if(req.body.value){
    q.value=req.body.value;
  }
  if(req.body.round){
    q.round=req.body.round;
  }
  if(req.body.isDailyDouble){
    q.isDailyDouble=req.body.isDailyDouble;
  }
  if(req.body.distractors){
    q.distractors=req.body.distractors;
  }
  q.save(function (err, userQuestion) {
    if (err){
      console.log(err);
      return res.status(500).send();
    } 
    else{
      console.log("User Question Updated");
      return res.status(200).send();
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