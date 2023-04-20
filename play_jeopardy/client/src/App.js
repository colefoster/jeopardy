import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes,  useLocation } from "react-router-dom";
import { useEffect  } from "react";
// We import all the components we need in our app

import OldHomePage from "./pages/OldHomePage"
import QuestionsPage from "./pages/QuestionsPage";
import CategoriesPage from "./pages/CategoriesPage";
import UserQuestionsPage from "./pages/UserQuestionsPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import EditQuestionPage from "./pages/EditQuestionPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LeaderboardPage from "pages/LeaderboardPage";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    // Store the current route in local storage when the page is about to be unloaded
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('lastRoute', location.pathname);
    });

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('beforeunload', () => {});
    };
  }, [location]);

  return (
    <div>
      
      
      <Routes>
        <Route exact path="/" element={<HomePage intro="off"/>} />
        <Route path="/home" element={<OldHomePage/>} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path ="/categories" element={<CategoriesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create" element={<AddQuestionPage />} />
        <Route path="/userQuestions" element={<UserQuestionsPage />} />
        <Route path="/add" element={<AddQuestionPage />} />
        <Route path="/edit" element={<EditQuestionPage />} />
      </Routes>
      
    </div>
  );
};

export default App;
