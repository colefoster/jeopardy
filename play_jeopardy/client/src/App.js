import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "components/Navbar";

import HomePage from "pages/HomePage";
import QuestionsPage from "pages/QuestionsPage";
import CategoriesPage from "pages/CategoriesPage";
import UserQuestionsPage from "pages/UserQuestionsPage";
import AddQuestionPage from "pages/AddQuestionPage";
import PlayPage from "pages/PlayPage";
import EditQuestionPage from "pages/EditQuestionPage";
import PlayNoGraphicsPage from "pages/PlayNoGraphicsPage";

const App = () => {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/playnographics" element={<PlayNoGraphicsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path ="/categories" element={<CategoriesPage />} />
        <Route path="/create" element={<AddQuestionPage />} />
        <Route path="/userQuestions" element={<UserQuestionsPage />} />
        <Route path="/add" element={<AddQuestionPage />} />
        <Route path="/edit" element={<EditQuestionPage />} />
      </Routes>
      
    </div>
  );
};

export default App;
