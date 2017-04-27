import React, {Component} from 'react';
import {render} from 'react-dom';
import Time from 'react-time'

class TimeWrapper extends Component {
  render() {
    let format = "MMMM Do YYYY";
    let titleFormat = format + " HH:mm:ss";
    if (this.props.showTime && this.props.showTime == true) format += " HH:mm"
    return (
      <Time titleFormat={titleFormat} format={format} {...this.props} />
    );
  }
}

export default TimeWrapper;
