import React, { Component } from "react";
import Option from "./Option";

class Question extends Component {
  constructor(props) {
    super(props);
    let qid = this.props.qID;
    let obj = {}; // must be replaced with api call
    if (qid === "P00") obj = require("./P00");
    if (qid === "P01") obj = require("./P01");
    if (qid === "Q01") obj = require("./Q01");
    if (qid === "Q02") obj = require("./Q02");
    if (qid === "Q03") obj = require("./Q03");
    this.state = {
      qID: obj.qID,
      qtext: obj.qtext,
      type: obj.type,
      options: obj.options.map((option) => {
        option.selected = 0;
        return option;
      }),
      optionselected: -1,
      nextqid: -1,
    };
  }
  handlePress = (pid, nqid) => {
    console.log("option pressed");
    const options = this.state.options.map((option) => {
      option.selected = option.optID === pid ? 1 : 0;
      return option;
    });
    this.setState({ options: options, optionselected: pid, nextqid: nqid });
  };

  render() {
    return (
      <div>
        <h2>{this.state.qtext}</h2>
        {this.state.options.map((option) => (
          <Option
            key={option.optID}
            onPress={this.handlePress}
            option={option}
          />
        ))}
        {this.formatNextButton()}
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

export default Question;
