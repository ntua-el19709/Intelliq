//import "./App.css";
import React from "react";
import Questionnaire from "./components/Questionnaire";
import Statquestionnaire from "./components/Statquestionnaire";
import Home from "./components/Home";
import Incorrect from "./components/Incorrect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/ans/:QID" element={<Questionnaire />}></Route>
          <Route
            exact
            path="/stats/:QID"
            element={<Statquestionnaire />}
          ></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/:incorrect" element={<Incorrect />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
