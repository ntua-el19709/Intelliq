import React, { Component } from "react";
import Statquestion from "./Statquestion";
import { useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class Statquestionnaire extends Component {
  constructor() {
    super();
    this.state = {
      questionnaireTitle: "loading...",
      questions: [],
      started: 0,
    };
  }

  componentDidMount() {
    const QID = this.props.params.QID;
    console.log(QID);
    fetch(`http://localhost:9103/intelliq_api/questionnaire/${QID}`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          questionnaireID: result.questionnaireID,
          questionnaireTitle: result.questionnaireTitle,
          questions: result.questions,
          qID: result.questions[0].qID,
          started: 0,
        });
      });
  }

  handleClickSeeStats = () => {
    this.setState({ started: 1 });
  };
  handleClickBack = () => {
    this.setState({ started: 0 });
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
          onClick={this.handleClickSeeStats}
        >
          View Statistics
        </button>
      );
    else
      return (
        <div>
          {this.state.questions.map((question) => (
            <Statquestion
              key={question.qID}
              QID={this.state.questionnaireID}
              qID={question.qID}
            />
          ))}
          <button
            className="btn btn-secondary m-2"
            onClick={this.handleClickBack}
          >
            Back
          </button>
        </div>
      );
  }
}

export default withRouter(Statquestionnaire);
