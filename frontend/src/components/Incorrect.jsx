import React from "react";
import { Link } from "react-router-dom";

function Incorrect() {
  return (
    <div>
      <h1> Incorrect link</h1>
      <div>
        <h2> For questionnaire completion enter:</h2>
        <ul>
          <li>localhost:3000/ans/:questionnaireID</li>
        </ul>
      </div>
      <div>
        <h2> For questionnaire statistics enter:</h2>
        <ul>
          <li>
            <Link to="/stats">localhost:3000/stats</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Incorrect;
