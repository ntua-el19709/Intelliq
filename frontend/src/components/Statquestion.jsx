import React, { Component } from "react";
import Statoption from "./Statoption";

class Statquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtext: "loading...",
      options: [],
      counts: {},
    };
  }
  componentDidMount() {
    let QID = this.props.QID;
    let qID = this.props.qID;
    fetch(`http://localhost:9103/intelliq_api/question/${QID}/${qID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          qID: obj.qID,
          qtext: obj.qtext,
          type: obj.type,
          options: obj.options,
        });
      });
    fetch(`http://localhost:9103/intelliq_api/getquestionanswers/${QID}/${qID}`)
      .then((response) => response.json())
      .then((obj) => {
        const counts = {};
        const answers = obj.answers.map((answer) => answer.ans);
        for (const ans of answers) {
          counts[ans] = counts[ans] ? counts[ans] + 1 : 1;
        }
        this.setState({
          counts: counts,
          size: answers.length,
        });
      });
  }
  getTitle() {
    if (this.state.options[0] === undefined) return;
    if (this.state.options[0].opttxt === "<open string>") return;
    return <h2>{this.state.qtext}</h2>;
  }

  render() {
    return (
      <div>
        {this.getTitle()}
        {this.state.options.map((option) => (
          <Statoption
            key={option.optID}
            option={option}
            size={this.state.size}
            counts={this.state.counts}
          />
        ))}
      </div>
    );
  }
}

export default Statquestion;
