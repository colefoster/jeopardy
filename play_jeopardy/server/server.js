const express = require("express");
const app = express();
const cors = require("cors");
const { questionModel, connectToDB} = require("./scripts/database_functions.js");


require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

// play_jeopardy REST API
app.get("/api/questions/", (req, res) => {
  console.log((req.query));
 
  questionModel.find({$and: [
    {clue: { $regex: sanitize(req.query.question), $options: "i" }},
    {response: { $regex: sanitize(req.query.answer), $options: "i" }},
    {category: {$regex: sanitize(req.query.category), $options: "i" }},
    {value: (req.query.value.length === 1 || req.query.value.length === 0) ?  {$gte: 0} : req.query.value}, 
    {round: (req.query.round.length === 3 || req.query.round.length === 0) ?  {$regex: ".*"} : req.query.round}, 
    (req.query.isDailyDouble.length === 1 || req.query.isDailyDouble.length === 0) ? 
    {$or :[{isDailyDouble: true},{isDailyDouble: false}]} :{isDailyDouble: req.query.isDailyDouble}]},
 
  function(err, questions) {
    console.log(questions[0]);
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      
      if(questions.length === 0){
        questionModel.find({value: -1}, function(err, questions) {
          if (err) {
            console.log(err);
          } else {
            res.send(questions);
          }
        });
        console.log("No questions found");
      }else{
        res.send(questions);

      }



      
    }
  }).limit(100);
});

app.get("/api/categories", (req, res) => {
  
  questionModel.find({$and: [
    (req.query.title.length === 0 ) ? 
    {title: {$regex: ".*"}} : {title: {$regex: sanitize(req.query.title), $options: "i" }},
    (req.query.clues_count.length === 0 ) ?
    {clues_count: {$gte: 0}} : {clues_count: req.query.clues_count},

    {},
    {},
    {}]},
     function(err, questions) {
    if (err) {
      console.log(err);
    } else {
      res.send(questions);
      
    }
  });
  
});
connectToDB();
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  
  console.log(`Server is running on port: ${port}`);
});



function sanitize(str) {
  if (typeof str !== "string") return ".*";
  
  return str.replaceAll("[-.\\+*?\\[^\\]$(){}=!<>|:\\\\]", "\\\\$0");
}