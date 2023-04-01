module.exports = Object.freeze({
    SERVER: (process.env.NODE_ENV === "production") ? 'https://play-jeopardy.herokuapp.com'  : 'http://localhost:5000',

});