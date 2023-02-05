import React, { Component } from "react";
import Question from "./Question";

class Questionnaire extends Component {
  constructor() {
    super();
    let statet = require("./sample"); // must be repaced with api call

    this.state = {
      questionnaireID: statet.questionnaireID,
      questionnaireTitle: statet.questionnaireTitle,
      qID: statet.questions[0].qID,
      started: 0,
      finished: 0,
    };
  }

  handlePressNext = (nqid, oid) => {
    //post oid(optionID),
    if (nqid === "-") this.setState({ finished: 1 });
    else this.setState({ qID: nqid });
  };

  handleClickStart = () => {
    this.setState({ started: 1 });
  };
  render() {
    return (
      <dev>
        <h1>{this.state.questionnaireTitle}</h1>
        {this.formatPage()}
      </dev>
    );
  }

  formatPage() {
    if (this.state.started === 0)
      return (
        <button
          className="btn btn-secondary m-2"
          onClick={this.handleClickStart}
        >
          START!!!!!!!!!!
        </button>
      );
    else if (this.state.finished === 0)
      return (
        <Question
          key={this.state.qID}
          QID={this.state.questionnaireID}
          qID={this.state.qID}
          onPressNext={this.handlePressNext}
        />
      );
    else return <h2>Questionnaire Completed</h2>;
  }
}

export default Questionnaire;
