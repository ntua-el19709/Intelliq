import React, { Component } from "react";

class Statoption extends Component {
  render() {
    return <div>{this.formatbutton()}</div>;
  }
  getpercentage() {
    let opt = this.props.option.optID;
    console.log(opt, this.props.counts, this.props.counts[opt]);
    if (this.props.counts[opt])
      return (this.props.counts[opt] * 100) / this.props.size;
    return 0;
  }

  formatbutton() {
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
