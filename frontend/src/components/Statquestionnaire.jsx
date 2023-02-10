import React, { Component } from "react";
import Statquestion from "./Statquestion";

class Statquestionnaire extends Component {
  constructor() {
    super();
    this.state = {
      questionnaireTitle: "loading...",
      questions: [],
      started: 0,
      finished: 0,
    };
  }

  componentDidMount() {
    let QID = "QQ000";
    fetch(`http://localhost:9103/intelliq_api/questionnaire/${QID}`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          questionnaireID: result.questionnaireID,
          questionnaireTitle: result.questionnaireTitle,
          questions: result.questions,
          qID: result.questions[0].qID,
          started: 0,
          finished: 0,
        });
      });
  }

  handlePressNext = (nqid, oid) => {
    //post oid(optionID),
    fetch(
      `http://localhost:9103/intelliq_api/doanswer/${this.state.questionnaireID}/${this.state.qID}/${oid}`,
      {
        method: "POST",
        mode: "cors",
      }
    );

    if (nqid === "-") this.setState({ finished: 1 });
    else this.setState({ qID: nqid });
  };

  handleClickStart = () => {
    this.setState({ started: 1 });
  };
  render() {
    return (
      <div>
        <h1>{this.state.questionnaireTitle}</h1>
        {this.formatPage()}
      </div>
    );
  }

  formatPage() {
    if (this.state.started === 0)
      return (
        <button
          className="btn btn-secondary m-2"
          onClick={this.handleClickStart}
        >
          See Statistics
        </button>
      );
    else if (this.state.finished === 0)
      return (
        <div>
          {this.state.questions.map((question) => (
            <Statquestion
              key={question.qID}
              QID={this.state.questionnaireID}
              qID={question.qID}
            />
          ))}
        </div>
      );
    else return <h2>Questionnaire Completed</h2>;
  }
}

export default Statquestionnaire;
