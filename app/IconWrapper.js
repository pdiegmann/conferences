import React, {Component} from 'react';
import {render} from 'react-dom';
import FontIcon from 'material-ui/FontIcon';
import {red500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginTop:4,
  marginRight: 8,
};

class TimeWrapper extends Component {
  render() {
    return (
      <FontIcon className="material-icons" style={iconStyles} color={blue500} hoverColor={red500}>{this.props.icon}</FontIcon>
    );
  }
}

export default TimeWrapper;
