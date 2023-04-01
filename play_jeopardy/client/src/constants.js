module.exports = Object.freeze({
    SERVER: (process.env.NODE_ENV === "production") ? 'https://play-jeopardy.herokuapp.com/api'  : 'http://localhost:5000',

});