import React, { Component } from "react";

class Option extends Component {
  render() {
    return <div>{this.formatbutton()}</div>;
  }

  formatbutton() {
    if (this.props.option.opttxt === "<open string>")
      return (
        <input
          type="text"
          onChange={(val) =>
            this.props.onPress(val.target.value, this.props.option.nextqID)
          }
        />
      );
    if (this.props.selected === 0)
      return (
        <button
          onClick={() =>
            this.props.onPress(
              this.props.option.optID,
              this.props.option.nextqID
            )
          }
          className="btn btn-outline-primary m-2"
        >
          {this.props.option.opttxt}
        </button>
      );
    else
      return (
        <button
          onClick={() =>
            this.props.onPress(
              this.props.option.optID,
              this.props.option.nextqID
            )
          }
          className="btn btn-primary m-2"
        >
          {this.props.option.opttxt}
        </button>
      );
  }
}

export default Option;
