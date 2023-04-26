const express = require("express");
const session = require('express-session');
const app = express();
const cors = require("cors");

const { v4: uuidv4 } = require('uuid');

const MongoDBStore = require('connect-mongodb-session')(session);


var Alea = require('alea')


const {gameModel, catModel, questionModel, userQuestionModel, 
  userModel,
  countGames, connectToDB, countUserQuestions} = require("./scripts/database_functions.js");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const categoryLimit = Number(process.env.CATEGORY_LIMIT);
const questionLimit = Number(process.env.QUESTION_LIMIT);

app.use(express.json());

// Add headers before the routes are defined



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true},
  function(req, username, password, done) {
    userModel.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
      if (!user.validPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   userModel.findById(id, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user.toObject()); // Convert Mongoose document to plain object
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ 
  secret: 'dy6J6GWJwHwmZohRTDHsPsSg1SsBivC1PxVFke1jec8',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  store: new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
  }),
  genid: function(req) {
    return uuidv4(); // Generate unique session ID using UUID
  }
}));

app.use(passport.initialize());
app.use(passport.session());
// Enable CORS for all origins with credentials

var whitelist = ['http://localhost:3000', 'https://play-jeopardy.netlify.app', 'https://cole-portfolio.netlify.app', ];

app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));


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

app.get("/api/widget", async (req, res) => {
  //WIDGET LOGIC
  //Get random category from past year
  //Get 1 of each value question from that category
  //Return as JSON

  const rng = new Alea(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  

  questionModel.find({}, (err, questions) => {
    if(err){
      console.log(err);
    }
    else{
      let fiveQuestions = [];
      while(fiveQuestions.length < 5){
        const randomCategory = questions[Math.floor(rng() * questions.length)].category;
        fiveQuestions = questions.filter(question => question.category === randomCategory).slice(0,5);
      }
      res.json(fiveQuestions);
  }}).sort({airdate :-1}).limit(9000);
  
});


async function generateGame(req, res) {
  const nCats = Number(process.env.GAME_SIZE_CATEGORIES) || 6;
  const nQs = Number(process.env.GAME_SIZE_QUESTIONS) || 5;
  const seed = req.query.seed || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const rng = new Alea(seed);
  const categoriesArray = [];
  const questionsMatrix = [...Array(nCats)].map(() => Array(nQs));
  const promises = [];

  for (let currentCategoryIndex = 0; currentCategoryIndex < nCats; currentCategoryIndex++) {
    const categoryPromise = new Promise(async (resolve, reject) => {
      try {
        const category = await catModel.findOne({
          $and: [
            {
              $or: [
                { id: Math.floor(rng() * 78176) },
                { id: Math.floor(rng() * 78176) },
                { id: Math.floor(rng() * 78176) },
                { id: Math.floor(rng() * 78176) },
                { id: Math.floor(rng() * 78176) },
                { id: Math.floor(rng() * 78176) }
              ]
            },
            { clues_count: { $gte: nQs } }
          ]
        });
        categoriesArray[currentCategoryIndex] = category;

        const questions = await questionModel.find({ category: category.title });
        const questionsArray = [];
        for (let currentRowIndex = 0; currentRowIndex < nQs; currentRowIndex++) {
          const targetValue = ((currentRowIndex + 1) * 200);
          const sameRowQuestions = questions.filter(q => (q.value === targetValue) || ((q.value === 2 * targetValue) && (q.round === "Double Jeopardy")));
          questionsArray.push(sameRowQuestions[Math.floor(rng() * sameRowQuestions.length)]);
        }

        questionsMatrix[currentCategoryIndex] = questionsArray;
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    promises.push(categoryPromise);
  }

  await Promise.all(promises);

  const newGame = new gameModel({
    id: countGames(),
    seed,
    categories: categoriesArray,
    questions: questionsMatrix,
    date: Date.now(),
    score: 0,
    isComplete: false
  });

  res.send(newGame);

  newGame.save(function (err, newGame) {
    if (err) {
      console.log(err);
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

app.post('/login',function (req, res, next) {
  
  // call passport authentication passing the "local" strategy name and a callback function
  passport.authenticate('local', function (error, user, info) {
    // this will execute in any case, even if a passport strategy will find an error
    // log everything to console
    

    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      req.login(user, next)
    }

  })(req, res, next);
}, function(req, res) {
  res.json(req.user);
  console.log(req.user);
});

app.post('/signup', function(req, res, next) {
  const { username, email, password } = req.body;
  console.log(req.body);
  // Check if the username and email are already taken
  userModel.findOne({ $or: [{ username }, { email }] }, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (user) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }

    // Create a new user object
    const newUser = new userModel({ username, email, password });

    // Save the user to the database
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return next(err);

      }

      // Log in the user
      req.login(newUser, function(err) {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json(newUser);
      });
    });
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.get('/api/user', function(req, res) {
  console.log(req)
});


app.get('/api/distractors/', async function (req, res) {
  console.log("Distractors Requested");
  const model = req.query.model;
  const category = req.query.category;
  const question = req.query.question
  const answer = req.query.answer;
  const apiPrefix = req.query.apiPrefix;
  const { OpenAIApi, Configuration } = require('openai');

  if(typeof (apiPrefix) === undefined){
    res.json(
     
      {
        
        "choices": [{
          "index": 0,
          "message": {
            "role": "assistant",
            "content": "No API Prefix  \nNo API Prefix  \nNo API Prefix  \nNo API Prefix  ",
        }}],
      });
      
      return
  }

  const configuration = new Configuration({
    
    organization: "org-QuAbMjgiJ0XJzR2aYWCQj9Jz",
    apiKey: apiPrefix + "296BCAAZYUy9X0yJg5hMT3BlbkFJDoCfUwp23bOfOIeCwVHv", 
  });
  const openai = new OpenAIApi(configuration);

  if(model && model === "text-davinci-003"){
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Produce 3 believeable wrong answers for this jeopardy `+ 
          `question: ${cleanQuestion}`+
          `, in Category: ${category}` +
          `, Correct Answer: ${answer}` + 
          `, Wrong Answers (comma separated):`,
      max_tokens: 150,
      temperature: 0.0,
    });
    console.log(response.data)
    res.json(response.data);
  }

  else if(model && model === "gpt-3.5-turbo"){
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You generate 3 plausible wrong answers for jeopardy questions based on the question, its category and its correct answer. Your replies are ONLY ever the 3 wrong answers, comma separated, NOT in the form of a question. Format wrong answers like the correct answer (e.g. If the answer is prefixed with 'a ' or 'the ' or 'to ', include the same prefix in your answers)."},
        {"role": "user", "content": `Question: ${question} under the category ${category} with the correct answer being ${answer}.`},
    ],
    max_tokens: 150,
    temperature: 0.5,
    });
    console.log(completion.data.choices[0]);

    res.json(completion.data);
  }

  else{
    res.json({message: "Invalid model"});
  }
});

app.get('/api/leaderboard/', async function (req, res) {
  const limit = req.query.limit || 10;
  const leaderboard = await gameModel.find({}).sort({score: -1}).limit(limit);
  res.json(leaderboard);
});

app.post('/api/save/', async function (req, res) {
  console.log(req.body)
  gameModel.updateOne({id: req.body.id}, {user:req.body.user, score:req.body.score}, function(err, game) {
    if (err || !game) {
      console.log(err);
      res.status(500).send();
    } 
    else {
     
      res.status(200).send(req.body);
    }
  });
});