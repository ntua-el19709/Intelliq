import React, { Component } from "react";
import Statoption from "./Statoption";

class Statquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtext: "loading...",
      options: [],
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
          options: obj.options.map((option) => {
            option.perc = 50.0;
            return option;
          }),
        });
      });
  }

  handlePress = (pid, nqid) => {
    console.log("option pressed");
    if (this.state.options[0].opttxt === "<open string>") {
      if (pid === "") this.setState({ optionselected: -1, nextqid: nqid });
      else this.setState({ optionselected: pid, nextqid: nqid });
    } else {
      const options = this.state.options.map((option) => {
        option.selected = option.optID === pid ? 1 : 0;
        return option;
      });
      this.setState({ options: options, optionselected: pid, nextqid: nqid });
    }
  };

  render() {
    return (
      <div>
        <h2>{this.state.qtext}</h2>
        {this.state.options.map((option) => (
          <Statoption key={option.optID} option={option} />
        ))}
      </div>
    );
  }

  formatNextButton() {
    if (this.state.optionselected !== -1)
      return (
        <button
          className="btn btn-secondary m-2"
          onClick={() =>
            this.props.onPressNext(
              this.state.nextqid,
              this.state.optionselected
            )
          }
        >
          {"->"}
        </button>
      );
    else return;
  }
}

export default Statquestion;
