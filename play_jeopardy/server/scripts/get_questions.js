
const { connectToDB,getCategories,getQuestions, removeDuplicateCategories, removeDuplicateQuestions, catModel, questionModel } = require("./dbFunctions.js");

connectToDB();

if (process.argv.length == 2){
    //get randon category between 1 and 1000
    console.log("Getting all questions");
    let offset = 0;
    for(;offset <= 230000; offset += 100){
        console.log("Getting questions " + offset + " to " + (offset + 100));
        setTimeout(() => {getQuestions(100, offset)}, offset + offset + offset );

       
    }
}
else if (process.argv.length == 3 && !isNaN(process.argv[2])){
    console.log("Adding " + process.argv[2] + " Questions to the database");

    let amount = process.argv[2];
    let i = 0
    for(;amount > 100; amount -= 100){
        getQuestions(100, i * 100);
        i++;
    }

    getQuestions(amount, i*100);
    
}
else if (process.argv.length == 4 && !isNaN(process.argv[2]) && !isNaN(process.argv[3])){
    console.log("Adding " + process.argv[2] + " Questions to the database, starting at " + process.argv[3]);
    let amount = Number(process.argv[2]);
    let start = Number(process.argv[3]);
    let timeout = 5000;
    for(;amount > 100; amount -= 100){
        console.log("Getting categories " +start + " to " + (start + 100));
        setTimeout(() => {getQuestions(100, start)}, timeout);
        timeout += 10000;
        start += 100;
    }

    setTimeout(() => {getQuestions(amount, process.argv[3])}, timeout);



}

removeDuplicateQuestions();
removeDuplicateCategories();
console.log("Database updated, New Totals:");
catModel.find({}, function(err, categories) {
    if (err) {
        console.log(err);
    } else {
        console.log("Categories in database: " + categories.length);
    }
});
questionModel.find({}, function(err, questions) {
    if (err) {
        console.log(err);
    } else {
        console.log("Questions in database: " + questions.length);
    }
});   
    

