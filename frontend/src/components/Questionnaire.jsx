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

class Questionnaire extends Component {
  constructor() {
    super();
    this.state = {
      questionnaireTitle: "loading...",
      started: 0,
      finished: 0,
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
          START
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

export default withRouter(Questionnaire);
