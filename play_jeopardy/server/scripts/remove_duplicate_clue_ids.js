const dotenv = require('dotenv');
dotenv.config({ path: "/config.env" });


const { connectToDB, questionModel, catModel  } = require("./database_functions.js");
const prompt = require('prompt-sync')({sigint: true});


setTimeout(async()=>{await connectToDB();}, 20);

setTimeout(async()=>{await start();}, 2000);


async function start(){
  catModel.find({}, function(err, categories){
    if(err){
      console.log(err);
    }
    else{

      for(let i = 0; i < categories.length; i++){
        let c = categories[i];
        let original = c.clue_ids.length;
        let removed=0;
          questionModel.find({category: c.title}, function(err, questions){ 
            if(err){
              console.log(err);
            }
            else{
              for(let j = 0; j < questions.length ; j++){
                let temp =[];
                let found = 0;
                c.clue_ids.map((clue_id) => {
                  if(clue_id === questions[j].id && found > 0){
                    //dont add value
                    removed++;
                  }
                  else if(clue_id === questions[j].id && found === 0){
                    temp.push(clue_id);//add first occurence
                    found++;
                  }
                  else{
                    temp.push(clue_id);

                  }
                });
                if((c.clue_ids.length - temp.length) > 0){
                  c.clue_ids = temp;
                  c.clues_count =  c.clue_ids.length;

                }else{
                }
                
              }
              if(removed > 0){
                console.log( c.title + " " + original + " -> " + c.clue_ids.length +"/"+  c.clues_count + " "+ i + "/" + categories.length + "("+ (c.clues_count/categories.length)+ "%)");
                c.save();
                if(c.clue_ids.length !== c.clues_count){
                  prompt("Error: " + c.title + " has " + c.clue_ids.length + " clue ids, but " + c.clues_count + " clues_count.");
                };
              }
              
                
              
            }
          });
      }
      
    }

  });
}




