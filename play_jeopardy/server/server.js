const express = require("express");
const app = express();
const cors = require("cors");


require("dotenv").config({ path: "./config.env" });
const {catModel, questionModel, connectToDB} = require("./scripts/database_functions.js");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection

app.get("/", (req, res) => {
  let q = "";
  questionModel.find({id: 1}, function(err, questions) {
    if (err) {
      console.log(err);
    } else {
      q = questions[0].clue;
    }
  });
  res.send(q);
  res.send("Hello World!");
});


// play_jeopardy REST API
app.get("/api/questions/", (req, res) => {
  searchQuestions(req, res);
  
});


app.get("/api/categories", (req, res) => {
  searchCategory(req, res);
});

app.get("/favicon.ico", (req, res) => {
  res.send("./public/favicon.ico");
});
    

app.listen(port, () => {
  connectToDB();
});


function searchQuestions(req, res) {
  questionModel.find({$and: [
    
    {clue: (req.query.question.length === 0) ? {$regex: ".*"} : { $regex: sanitize(req.query.question), $options: "i" }}, // no question query parameter
     
    
    {response: (req.query.answer.length === 0 ) ? {$regex: ".*"} : { $regex: sanitize(req.query.answer), $options: "i" }}, // answer query parameter

    
    {category: (req.query.category.length === 0 ) ? {$regex: ".*"} : {$regex: sanitize(req.query.category), $options: "i" }}, // no category query parameter
     

    
    {value: (req.query.value.length === 1 || req.query.value.length === 3 ) ? {$gte: 0} :  req.query.value}, // no value query parameter or ANY value query parameter
       // value query parameter
    
    
    {round: (req.query.round.length === 3 || req.query.round.length === 0  ) ? {$regex: ".*"}: {round: req.query.round}}, // no round query parameter, or ANY round query parameter
      // round query parameter
      
     
    (req.query.isDailyDouble.length === 1 || req.query.isDailyDouble.length === 0) ? 
    {$or :[{isDailyDouble: true},{isDailyDouble: false}]} :{isDailyDouble: req.query.isDailyDouble}]},
    function(err, questions) {
      if (err) {
        console.log(err);
      } else {
        if(questions.length === 0){
          questionModel.find({value: -1}, function(err, placeholder) {
            if (err) {
              console.log(err);
            } else {
              console.log(placeholder);
              res.send(placeholder);
            }
          });
          console.log("No questions found");
        }else{
          console.log(questions);
          res.send(questions);
        }       
      }
    }).limit(50);
}

function searchCategory(req, res) {
  catModel.find({$and: [
    (req.query.title.length === 0 ) ? 
    {title: {$regex: ".*"}} // no title query parameter
     : {title: {$regex: sanitize(req.query.title), $options: "i" }},

    (req.query.countMin.length === 0 ) ?
    {clues_count: {$gte: 0}}  // no countMin query parameter
     : {clues_count: {$gte: req.query.clues_count}},


     (req.query.countMax.length === 0 ) ?
     {clues_count: {$lte: 1000}}  // no countMax query parameter
      : {clues_count: {$lte: req.query.countMax}}]},
    function(err, questions) {
      if (err) {
        console.log(err);
      } 
      else {
        res.send (questions);
      }
    });  
}

function sanitize(str) {
  if (typeof str !== "string") return ".*";
  
  return str.replaceAll("[-.\\+*?\\[^\\]$(){}=!<>|:\\\\]", "\\\\$0");
}