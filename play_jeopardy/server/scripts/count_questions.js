const { connectToDB, questionModel } = require("./dbFunctions.js");
const fs = require('fs');

let data = JSON.parse(fs.readFileSync("clues.json", 'utf8'));
connectToDB();
console.log(data.length);