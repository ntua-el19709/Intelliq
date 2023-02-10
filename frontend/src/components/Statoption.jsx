import React, { Component } from "react";

class Statoption extends Component {
  render() {
    return <div>{this.formatbutton()}</div>;
  }

  formatbutton() {
    console.log(this.props.option.opttxt);
    if (this.props.option.opttxt === "<open string>")
      return (
        <input
          type="text"
          onChange={(val) =>
            this.props.onPress(val.target.value, this.props.option.nextqID)
          }
        />
      );
    else
      return (
        <dev>
          <text>
            {this.props.option.perc}% {this.props.option.opttxt}
          </text>
        </dev>
      );
  }
}

export default Statoption;
