import React, {Component} from 'react';
import {render} from 'react-dom';
import ExternalLink from './ExternalLink';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TimeWrapper from './TimeWrapper'
import IconWrapper from './IconWrapper'

class ConferenceTableLine extends Component {
  render() {
    return (
      <TableRow hoverable={true}>
        <TableRowColumn>{this.props.conference.short} {this.props.conference.number}</TableRowColumn>
        <TableRowColumn><TimeWrapper value={this.props.conference.dates.deadline}/> (<TimeWrapper value={this.props.conference.dates.deadline} relative />)</TableRowColumn>
        <TableRowColumn><TimeWrapper value={this.props.conference.dates.starting}/> (<TimeWrapper value={this.props.conference.dates.starting} relative />)</TableRowColumn>
        <TableRowColumn><TimeWrapper value={this.props.conference.dates.ending}/></TableRowColumn>
        <TableRowColumn>{this.props.conference.location.city}, {this.props.conference.location.country}</TableRowColumn>
        <TableRowColumn>
          <ExternalLink text={<IconWrapper icon="home" />} url={this.props.conference.urls.main} />
          <ExternalLink text={<IconWrapper icon="message" />} url={this.props.conference.urls.cfp} />
          <ExternalLink text={<IconWrapper icon="format_list_numbered" />} url={this.props.conference.urls.tracks} />
          <ExternalLink text={<IconWrapper icon="schedule" />} url={this.props.conference.urls.dates} />
          <ExternalLink text={<IconWrapper icon="map" />} url={this.props.conference.location.venueUrl} />
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default ConferenceTableLine;
