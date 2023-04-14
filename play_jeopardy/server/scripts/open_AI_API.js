const dotenv = require('dotenv');
dotenv.config({ path: "/config.env" });

const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('text-curie-001 (April 4th)');
const headingColumnNames = [
    "Timestamp",
    "Category",
    "Question",
    "Correct Answer",
    "Wrong Answer 1",
    "Wrong Answer 2",
    "Wrong Answer 3",
    "Wrong Answer 4",
    "Wrong Answer 5",
    "Prompt Tokens",
    "Completion Tokens",
    "Total Tokens",
    "Finish Reason",
    "Full Text"
];
for(let i = 0; i < headingColumnNames.length; i++){
    ws.cell(1, i+1).string(headingColumnNames[i]);
}

const { connectToDB, questionModel, catModel  } = require("./database_functions.js");
const prompt = require('prompt-sync')({sigint: true});
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
    
    organization: "org-QuAbMjgiJ0XJzR2aYWCQj9Jz",
    apiKey: "" 
});
const openai = new OpenAIApi(configuration);

connectToDB();

setTimeout(async()=>{await start();}, 1000);

async function start(){
    catModel.find({}, function(err, cats){}).then(
        async (cats) => {
            for (let i = 0; i < cats.length; i++){
                prompt("Press enter to do next category");
                await questionModel.find({category: cats[i].title}, function(err, questions){}).then(
                    async (questions) => {
                        for (let j = 0; j < questions.length; j++){
                            
                            let q = questions[j];
                            let cleanQuestion = q.clue.replace(/(\([^)]+\)|<[^>]*>)/g, "");
                            let answer = q.response;
                            let category = q.category;
                            
                            
                        }
                    }
                );  
                    
            }
        }
        
    );
}

function writeRowToExcel(row, data){
    console.log(data);
const currentDate = new Date();
const timestamp = currentDate.getTime();
        ws.cell(row, 1).string(timestamp);

        ws.cell(row, 2).string(data.category);

        ws.cell(row, 3).string(data.clue);

        ws.cell(row, 4).string(data.response);

        for(let i = 0; i < 5; i++){

            ws.cell(row, 5+i).string(data["distractors"][i]);

        }

        ws.cell(row, 10).string(data.prompt_tokens);

        ws.cell(row, 11).string(data.completion_tokens);

        ws.cell(row, 12).string(data.total_tokens);

        ws.cell(row, 13).string(data.finish_reason);

        ws.cell(row, 14).string(data.full_text);

}

getDistractorsForQuestion = async (question, answer, category) => {
    prompt("Press enter to send openai request");
    const response = await openai.createCompletion({
        model: "text-curie-001",
        prompt: `Produce believeable wrong answers for this jeopardy `+ 
            `question: ${cleanQuestion}`+
            `, Category: ${category}` +
            `, Correct Answer: ${answer}` + 
            `, Wrong Answers:`,
        max_tokens: 150,
        temperature: 0.7,
    });

    let distractors = response.data.choices[0].text.split('\nd');

    console.log("\nCategory:");
    console.log(category);

    console.log("\nQuestion:");
    console.log(cleanQuestion);

    console.log("\nCorrect Answer:");
    console.log(answer);

    console.log("\nWrong Answers Generated (" + distractors.length +"):");
    for(let k = 0; k < distractors.length; k++){
        console.log(" * " +  distractors[k] + " * ");
    }
    console.log("\nresponse.data.usage:");
    console.log(response.data.usage);

    const input = prompt("Press enter to save this question's distractors to the database");
    if(input == "d"){
        prompt("Press enter to send davinci request");
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Produce believeable wrong answers for this jeopardy `+ 
                `question: ${cleanQuestion}`+
                `, Category: ${category}` +
                `, Correct Answer: ${answer}` + 
                `, Wrong Answers:`,
            max_tokens: 150,
            temperature: 0.7,
        });
        let distractors = response.data.choices[0].text.split('- ');

        console.log("\nCategory:");
        console.log(category);

        console.log("\nQuestion:");
        console.log(cleanQuestion);

        console.log("\nCorrect Answer:");
        console.log(answer);
        
        console.log("\nWrong Answers Generated (" + distractors.length +"):");
        for(let k = 0; k < distractors.length; k++){
            console.log(" * " +  distractors[k] + " * ");
        }
        console.log("\nresponse.data.usage:");
        console.log(response.data.usage);

        prompt("Press enter to save this question's distractors to the database");
        questionModel.updateOne({_id: q._id}, {distractors: distractors}, function(err, res){
            writeRowToExcel(i+2, q);
            if (err) throw err;
            console.log("Question updated");
        });
    }
    else{
        questionModel.updateOne({_id: q._id}, {distractors: distractors}, function(err, res){
            writeRowToExcel(i+2, q);
            if (err) throw err;
            console.log("Question updated");
        });
    }
}
                            