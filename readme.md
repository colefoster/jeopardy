# Play Jeopardy: MERN Stack Web Application

Play Jeopardy is an online simulation game of the famous TV show Jeopardy, built with MongoDB, Express.js, React.js, and Node.js (MERN Stack). 

The project is hosted live at [play-jeopardy.netlify.app](https://play-jeopardy.netlify.app).

## Features

- **User Authentication**: Sign up and login to your personal account.
- **Gameplay**: Play a simulated game of Jeopardy with varying difficulty levels.
- **High Scores/Leaderboards**: Track your scores and compare with other players on the leaderboard.
- **AI Generated Wrong Answers**: Our multiple-choice mode features AI-generated wrong answers. This impressive feature is accomplished using OpenAI's API, with the ability to select and use different models.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm. Install them from [here](https://nodejs.org/en/download/).
- You have installed MongoDB. You can install it from [here](https://www.mongodb.com/try/download/community).
- You have a basic understanding of JavaScript, React.js, and MongoDB.

## Installing Play Jeopardy

To install Play Jeopardy, follow these steps:

1. Clone the repo
git clone https://github.com/your-username/play-jeopardy.git

2. Go into the repo
cd play-jeopardy

3. Install the dependencies in both the root and client folder
npm install
cd client
npm install

## Using Play Jeopardy

To use Play Jeopardy, follow these steps:

1. Create a `.env` file in the root directory and fill it with your own information as per the `.env.example` file.

2. Start the development server
npm run dev

3. Open your web browser and go to `http://localhost:3000`

You should now be able to see the project running on your local machine.

## Deploying Play Jeopardy

The project is configured for deployment on Netlify and Heroku. For more detailed instructions, refer to their respective documentation: [Netlify](https://docs.netlify.com/), [Heroku](https://devcenter.heroku.com/).
