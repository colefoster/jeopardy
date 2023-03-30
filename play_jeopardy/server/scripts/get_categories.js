
const { connectToDB,getCategories, removeDuplicateCategories, removeDuplicateQuestions, catModel, questionModel } = require("./dbFunctions.js");

connectToDB();

if(process.argv.length == 2){
    //get randon category between 1 and 1000
    let ren = Math.floor(Math.random() * 1000) + 1;
    getCategories(1, ren);
}
else if (process.argv.length == 3 && !isNaN(process.argv[2])){
    console.log("Adding " + process.argv[2] + " categories to the database");

    let amount = process.argv[2];
    let i = 0
    let timeout = 0;
    for(;amount > 100; amount -= 100){
        setTimeout(() => {getCategories(100, i)}, timeout);
        timeout += 10000;
        i+=100;
    }

    getCategories(amount, i);
    
}
else if (process.argv.length == 4 && !isNaN(process.argv[2]) && !isNaN(process.argv[3])){
    console.log("Adding " + process.argv[2] + " categories to the database, starting at " + process.argv[3]);
    let amount = Number(process.argv[2]);
    let start = Number(process.argv[3]);
    let timeout = 5000;
    for(;amount > 100; amount -= 100){
        console.log("Getting categories " +start + " to " + (start + 100));
        
        setTimeout(() => {getCategories(100, start)}, timeout);
        timeout += 1000;
        start += 100;
    }

    getCategories(amount, process.argv[3]);
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
    
}
else{
    //invalid arguments
    console.log("Invalid arguments - please enter a number of categories to retrieve (max 100) and an offset (optional)");
    console.log("Example: \n> node getClues.js 50\nor\n> node getClues.js 50 100")
    process.exit(0);    
}


