import React, { Component } from "react";
import { Link } from "react-router-dom";

class AllStats extends Component {
  constructor() {
    super();
    this.state = {
      questionnaires: [],
      exist: 0,
    };
  }
  componentDidMount() {
    fetch(`http://localhost:9103/intelliq_api/admin/getallquestionnaires`)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "failed") {
          this.setState({
            ...this.state,
            exist: 0,
          });
        } else {
          this.setState({
            ...this.state,
            questionnaires: result,
            exist: 1,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          ...this.state,
          exist: 0,
        });
      });
  }
  render() {
    return (
      <div>
        <h1>Select Questionnaire</h1>
        {this.formatPage()}
      </div>
    );
  }
  formatPage() {
    if (this.state.exist === 0) return <h2>No Questionnaires found</h2>;
    if (this.state.questionnaires.length === 0)
      return <h2>No Questionnaires found</h2>;
    return (
      <ul>
        {this.state.questionnaires.map((quest) => (
          <li key={quest.questionnaireID}>
            <Link to={quest.questionnaireID}>{quest.questionnaireTitle}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default AllStats;
