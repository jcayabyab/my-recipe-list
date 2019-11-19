import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <NavBar></NavBar>      
      <LandingPage></LandingPage>
    </div>
  );
};

export default App;
