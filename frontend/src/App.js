//import "./App.css";
import React from "react";
import Questionnaire from "./components/Questionnaire";
import Statquestionnaire from "./components/Statquestionnaire";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
