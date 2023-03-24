
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
    for(;amount > 100; amount -= 100){
        getCategories(100, i * 100);
        i++;
    }

    getCategories(amount, i*100);
    
}
else if (process.argv.length == 4 && !isNaN(process.argv[2])&& process.argv[2] <= 100 && !isNaN(process.argv[3])){
    console.log("Adding " + process.argv[2] + " categories to the database, starting at " + process.argv[3]);

    getCategories(process.argv[2], process.argv[3]);
    setTimeout(function(){
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

        
        setTimeout(function(){console.log("Script is exiting...");process.exit(0);}, 2 * 1000); //extra time to count database entries
        
    }, 10 * 1000);   
    
}
else{
    //invalid arguments
    console.log("Invalid arguments - please enter a number of categories to retrieve (max 100) and an offset (optional)");
    console.log("Example: \n> node getClues.js 50\nor\n> node getClues.js 50 100")
}


