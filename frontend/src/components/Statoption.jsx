import React, { Component } from "react";

class Statoption extends Component {
  render() {
    return <div>{this.formatoption()}</div>;
  }
  getpercentage() {
    let opt = this.props.option.optID;
    let perc = 0;
    if (this.props.counts[opt]) {
      perc = (this.props.counts[opt] * 100) / this.props.size;
      return perc.toFixed(2);
    }
    return 0;
  }

  formatoption() {
    if (this.props.option.opttxt === "<open string>") return;
    else
      return (
        <div>
          {this.getpercentage()}% {this.props.option.opttxt}
        </div>
      );
  }
}

export default Statoption;
