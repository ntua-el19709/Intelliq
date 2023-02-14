import React, { Component } from "react";
import Statquestion from "./Statquestion";
import { useParams, Link } from "react-router-dom";

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
      questionnaireTitle: "Loading...",
      started: 0,
      questions: [],
      found: 1,
    };
  }
  componentDidMount() {
    const QID = this.props.params.QID;
    if (QID !== this.state.questionnaireID)
      fetch(`http://localhost:9103/intelliq_api/questionnaire/${QID}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "failed") {
            this.setState({
              ...this.state,
              found: 0,
              questionnaireID: QID,
            });
          } else {
            this.setState({
              ...this.state,
              questionnaireID: result.questionnaireID,
              questionnaireTitle: result.questionnaireTitle,
              questions: result.questions,
              qID: result.questions[0].qID,
              started: 0,
              found: 1,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            ...this.state,
            found: 0,
            questionnaireID: QID,
          });
        });
  }

  handleClickSeeStats = () => {
    this.setState({ ...this.state, started: 1 });
  };
  handleClickBack = () => {
    this.setState({ ...this.state, started: 0 });
  };
  render() {
    return <div>{this.formatPage()}</div>;
  }

  formatPage() {
    if (this.state.found === 0)
      return (
        <div>
          <h3>
            The Questionnaire with id {this.props.params.QID} does not exist.
            Please check the Questionnaire id and try again.
          </h3>
        </div>
      );
    else if (this.state.started === 0)
      return (
        <div>
          <h1> {this.state.questionnaireTitle}</h1>
          <button
            className="btn btn-secondary m-2"
            onClick={this.handleClickSeeStats}
          >
            View Statistics
          </button>
          <Link to="/stats">
            <button className="btn btn-danger m-2">Exit</button>
          </Link>
        </div>
      );
    else
      return (
        <div>
          <h1> {this.state.questionnaireTitle}</h1>
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
