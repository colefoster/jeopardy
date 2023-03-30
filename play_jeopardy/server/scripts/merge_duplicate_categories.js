const fs = require('fs');
const mongoose = require("mongoose");
const he = require("he");
const { connectToDB, questionModel, catModel  } = require("./database_functions.js");
const prompt = require('prompt-sync')({sigint: true});

let knownCategories = [];
let mergedCount = 0;
connectToDB();

let qCount = 0;

countQuestions();
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

setTimeout(() => {start();}, 60000);

const start = function(){
    let catCluesSum = 0;
    //console.log("Starting merge process...");
    catModel.find({}, function(err, categories) {
        if (err) {
            console.log(err);
        }
        else{

            for(c in categories){
                catCluesSum += Number(categories[c].clues_count);
                if (catCluesSum> 461900)
                    console.log(categories[c].title + " has " + categories[c].clues_count + " clues.  -> " + catCluesSum);
                /* console.log(c);
                if(!knownCategories.includes(categories[c].title)){
                    knownCategories.push(categories[c].title);

                }
                else{
                    merge(categories[c]);
                    console.log("Merged " + categories[c].title);
                } */
            }
        }
    });
    console.log("There are " + catCluesSum + " clues attached to questions in the database.");
}

const merge = function (category){
    console.log("Merging " + category.title);
    catModel.find({title: category.title}, function(err, matches) {
        if (err) {
            console.log(err);
        }
        else{
            if(matches.length > 1){
                let merged = matches[0];
                let originalCount = merged.clues_count;
                for(m in matches){
                    if(m > 0){
                        console.log("Found " + m + " extra matches for " + category.title);
                        for(c in matches[m].clue_ids){
                            merged.clue_ids.push(matches[m].clue_ids[c]);
                            merged.clues_count++;
                            console.log("Added clue " + matches[m].clue_ids[c] + " to " + merged.title);
                        }
                        catModel.deleteOne({_id: matches[m]._id}, function(err, result) {
                            if (err) {
                                console.log(err);
                            }
                            else{
                                console.log("Deleted ");
                                mergedCount++;
                            }
                        });
                    }
                }
                setTimeout(() => {merged.save();console.log("Saved " + merged.title +" (" + originalCount + " -> " + merged.clues_count + ")");}, 1000);
            }
        }
    });


}