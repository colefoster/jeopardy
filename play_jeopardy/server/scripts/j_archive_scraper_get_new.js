const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");
const parseDate = require("date-fns/parse");
const pMap = require("p-map");
const prompt = require('prompt-sync')({sigint: true});
const { connectToDB, questionModel, catModel } = require("./dbFunctions.js");

connectToDB()
setTimeout(() => {countQuestions();}, 100);
setTimeout(() => {countCategories();}, 200);
setTimeout(() => {start();}, 70000);


let qCount = 0;


async function countQuestions(){
    console.log("finding all questions...")
    questionModel.find({}, function(err, questions) {
        
        if (err) {
            console.log(err);
        } else {
            qCount = questions.length;
            console.log("There are " + qCount + " questions in the database.");
        }
    });
    
}

let catCount = 0;
let categoriesProcessed = [];

async function countCategories(){
    console.log("finding all categories...")
    catModel.find({}, function(err, categories) {
        
        if (err) {
            console.log(err);
        } else {
            catCount  = categories.length;
            console.log("There are " + catCount + " categories in the database.");
            for(c in categories){
                if(!categoriesProcessed.includes(categories[c])){
                    categoriesProcessed.push(categories[c]);
                }
            }
            console.log("Learned which categories already exist to avoid adding duplicates...")
        }
    });
    
}


const start =function (){
  prompt("Press enter to start scraping... (70 second Delay)");
  questionModel.findOne({})
.sort('-game_id')
.exec( function(err, question) {
  if (err) {
    console.log(err);
  }
  else{
    let start = question.game_id + 1

    prompt("Going to grame game " + start + "...");
      try{
        addClues(fetchGameData(start));
      }
      catch(e){
        console.log("Error fetching game data: " + e)
        
      }
  }
});
}

function addClues(clues){
  questionModel.find({airdate: clues[0].airDate}, function(err, questions) {
    if (err) {
      console.log(err);
    } else {
      if(questions.length > 0){
        console.log("Game already exists in database");
      }else{
        console.log("Adding game to database...");
        for(q in clues){
    
          try{
            questionModel.find({id: q}, function(err, questions) {
                if (err) {
                    console.log(err);
                } else {
                    if(questions.length === 1){
                        console.log("Question already exists in database");
                    }
                    else if(questions.length > 1){
                        console.log("Error: more than one question with the same id");
                        for (let i = 1; i < questions.length; i++) {
                            questionModel.deleteOne({id: questions[i].id}, function(err) {
                                if(err) console.log(err);
      
                                console.log("Deleted question: " + question[i].id);
                            });
                        }
                    }
                    else if(questions.length === 0){
      
                        try{
                            let question = new questionModel({
                                id : q,
                                clue : he.decode(data[q].clue),
                                response : he.decode(data[q].response),
                                category : data[q].category,
                                round : getRound(data[q].round),
                                value : data[q].value,
                                isDailyDouble: data[q].isDailyDouble,
                                airdate : data[q].airDate,
                                game_id : data[q].gameId,
                                distractors : []
                            });
                            try{
                                saveQuestion(question);
                            }
                            catch(err){
                                console.log("Error saving question to database: " + err);
                            }
                            try{
                                if(categoriesProcessed.includes(data[q].category)){
                                    catModel.updateOne({title: data[q].category},{$push :{clue_ids:q}, $inc: {clues_count: 1}}, function(err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("updated existing category: " + (data[q].category));                                       
                                            }
                                    });
                                    
                                }
                                else{
                                    let category = new catModel({
                                        id : catCount++,
                                        title : data[q].category,
                                        clues_count : 1,
                                        clue_ids: [q]
                                    });
                                    categoriesProcessed.push(data[q].category);
      
                                    console.log("Created new category: " + (data[q].category));
            
                                    try{
                                        saveCategory(category);
                                    }
                                    catch(err){
                                        console.log("Error saving category to database: " + err);
                                    }
                                }
                            }
                            catch(e){
                                console.log("Error parsing category: from question: " +data[q]);
                                console.log(e)
                            }
                        }
                        catch(e){
                            console.log("Question " + q + " was blank");
                        }
                        
                        
                        
                    }
                }
            });
          }
          
          catch(err){
              console.log(err);
              console.log("Error parsing question: " + q);
              console.log(data[q]);
          }
        }
      }
    }
  });
 
}
const fetchGameData = gameId => {
  return axios
    .get(`http://www.j-archive.com/showgame.php?game_id=${gameId}`)
    .then(({ data }) => {
      const $ = cheerio.load(data);
      const clues = [];

      const airDateString = $("#game_title")
        .text()
        .split(" - ")[1];
      const airDate = parseDate(
        airDateString,
        "dddd, MMMM D, YYYY",
        new Date()
      );

      const categories = [];
      $(".category_name").each(function() {
        categories.push($(this).text());
      });

      $(".clue").each(function(i, elem) {
        // Calculate category, round and value based off of index of clue
        let category;
        let round;
        let value;
        if (i < 30) {
          category = categories[i % 6];
          round = "j";
          value = Math.floor(i / 6 + 1) * 200;
        } else if (i < 60) {
          category = categories[i % 6 + 6];
          round = "dj";
          value = Math.floor((i - 30) / 6 + 1) * 400;
        } else if (i === 60) {
          category = categories[12];
          round = "fj";
        }

        const clue = cheerio(".clue_text", elem).html();
        // Get response by accessing the onmouseover value and parsing it as a cheerio object
        let response;
        if (i < 60) {
          const mouseOverContent = cheerio("div", elem).attr("onmouseover");
          response = cheerio(".correct_response", mouseOverContent).text();
        } else if (i === 60) {
          const mouseOverContent = $(".final_round div").attr("onmouseover");
          response = cheerio("em", mouseOverContent).text();
        }

        // Check if clue was daily double
        const isDailyDouble = !!cheerio(".clue_value_daily_double", elem)
          .length;

        if (clue !== "") {
          clues.push({
            clue,
            response,
            category,
            isDailyDouble,
            round,
            value,
            airDate,
            gameId
          });
        }
      });
      if (gameId % 5 === 0) {
        console.log(gameId);
      }
      return clues;
    })
    .catch((e) => {
      console.log("ERROR", gameId);
      console.log(e);
    });
};

// Use p-map to throttle http requests to j-archive to avoid timeouts
pMap(new Array(1), (_, i) => fetchGameData(i + 1), { concurrency: 15 })
  .then(games => games.reduce((acc, game) => acc.concat(game), []))
  .then(clues => {
    console.log("DONE!");
    fs.writeFileSync("new_game.json", JSON.stringify(clues));
});

async function saveQuestion(question){
  //save categories to the database
  try{
      await question.save();
      console.log("Saved new Question :" + question.id);
  }
  catch(err){
      console.log("Error saving question to database: " + err);
  }
}

async function saveCategory(category){
  //save categories to the database
  try{
      await category.save();
      console.log("Saved new Category:" + category.id );
  }
  catch(err){
      console.log("Error saving category to database: " + err);
  }
}