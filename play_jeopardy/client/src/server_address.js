//PROCESS.ENV / DOTENV IS NOT AVAILBLE FOR CLIENTS, THUS WE USE THIS OBJECT TO STORE THE DYNAMIC SERVER ADDRESS
module.exports = Object.freeze({
    URL: (process.env.NODE_ENV === "production") ? 'https://play-jeopardy.herokuapp.com'  : 'http://localhost:5000'
});