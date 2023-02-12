//import logo from "./logo.svg";
import "./App.css";
import Questionnaire from "./components/Questionnaire";
import Statquestionnaire from "./components/Statquestionnaire";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/ans/:QID" element={<Questionnaire />}></Route>
        <Route exact path="/stats/:QID" element={<Statquestionnaire />}></Route>
      </Routes>
    </Router>
  );

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MOUCHLI ISE POLLA GAYYYYYY Edit <code>src/App.js</code> and save to
          reload
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
