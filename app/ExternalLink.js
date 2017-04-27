import React, {Component} from 'react';
import {render} from 'react-dom';

class ExternalLink extends Component {
  render() {
    return (
      <a href={this.props.url} target="_blank">{this.props.text}</a>
    );
  }
}

export default ExternalLink;
