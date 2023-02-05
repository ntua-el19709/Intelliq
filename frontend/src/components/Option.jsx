import React, { Component } from "react";

class Option extends Component {
  render() {
    return <div>{this.formatbutton()}</div>;
  }

  formatbutton() {
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
