import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Home from "./components/home";
import Navbar from "./components/navbar";
import QuestionsList from "./components/questionsList";
import CategoriesList from "./components/categoriesList";
import UserQuestionsList from "./components/userQuestionsList";
import AddQuestionPage from "./components/addQuestionPage";
import Play from "./components/play";


const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/play" element={<Play />} />
        <Route path="/questions" element={<QuestionsList />} />
        <Route path ="/categories" element={<CategoriesList />} />
        <Route path="/create" element={<AddQuestionPage />} />
        <Route path="/userQuestions" element={<UserQuestionsList />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
