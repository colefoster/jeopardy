const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });
const { questionModel, connectToDB} = require("./scripts/dbFunctions.js");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

// play_jeopardy REST API
app.get("/api/questions/", (req, res) => {
  console.log((req.query));
  questionModel.find({
    question: { $regex: req.query.question, $options: "i" },
    answer: { $regex: req.query.answer, $options: "i" },
    "category.title": {$regex: req.query.category, $options: "i" },
    value: (req.query.value).length === 0 ?  {$gte: 0} : req.query.value

  },
 
  function(err, questions) {
    
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if(questions.length > 1000){
        questions = questions.slice(0, 1000);
      }
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
  })
});

app.get("/api/categories", (req, res) => {
  
  questionModel.find({category_id: 1}, function(err, questions) {
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
