import React, { Component } from "react";
import Question from "./Question";
import { useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

class Questionnaire extends Component {
  constructor() {
    super();
    this.state = {
      questionnaireTitle: "Loading...",
      started: 0,
      finished: 0,
      found: 1,
    };
  }

  componentDidMount() {
    const QID = this.props.params.QID;
    fetch(`http://localhost:9103/intelliq_api/questionnaire/${QID}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "failed") {
          this.setState({
            found: 0,
          });
        }
        this.setState({
          questionnaireID: result.questionnaireID,
          questionnaireTitle: result.questionnaireTitle,
          qID: result.questions[0].qID,
          started: 0,
          finished: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePressNext = (nqid, oid) => {
    fetch(
      `http://localhost:9103/intelliq_api/doanswer/${this.state.questionnaireID}/${this.state.qID}/${this.state.session}/${oid}`,
      {
        method: "POST",
        mode: "cors",
      }
    );

    if (nqid === "-") this.setState({ finished: 1 });
    else this.setState({ qID: nqid });
  };

  handleClickStart = () => {
    const ranses = makeid(4);
    this.setState({ started: 1, session: ranses });
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
          <h1>{this.state.questionnaireTitle}</h1>
          <button
            className="btn btn-secondary m-2"
            onClick={this.handleClickStart}
          >
            START
          </button>
        </div>
      );
    else if (this.state.finished === 0)
      return (
        <div>
          <h1>{this.state.questionnaireTitle}</h1>
          <Question
            key={this.state.qID}
            QID={this.state.questionnaireID}
            qID={this.state.qID}
            onPressNext={this.handlePressNext}
          />
        </div>
      );
    else return <h2>Questionnaire Completed</h2>;
  }
}

export default withRouter(Questionnaire);
