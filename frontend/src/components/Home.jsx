import React from "react";

function Home() {
  return (
    <div>
      <h1> Home Page</h1>
      <div>
        <h2> For questionnaire completion enter:</h2>
        <ul>
          <li>localhost:3000/ans/:questionnaireID</li>
        </ul>
      </div>
      <div>
        <h2> For questionnaire statistics enter:</h2>
        <ul>
          <li>localhost:3000/stats/:questionnaireID</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
