import React, {Component} from 'react';
import {render} from 'react-dom';
import ExternalLink from './ExternalLink';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TimeWrapper from './TimeWrapper'
import IconWrapper from './IconWrapper'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import LinkIcon from 'material-ui/svg-icons/editor/insert-link';
import TracksIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import MapIcon from 'material-ui/svg-icons/maps/map';
import ScheduleIcon from 'material-ui/svg-icons/action/schedule';
import HomeIcon from 'material-ui/svg-icons/action/home';
import AnnouncementIcon from 'material-ui/svg-icons/action/announcement';
import ProgramIcon from 'material-ui/svg-icons/action/dashboard';
import {red500, blue500, amber100, deepOrange100, lime200} from 'material-ui/styles/colors';

class ConferenceTableLine extends Component {
  constructor(props) {
    super(props);
    this.rowStyle = {whiteSpace: 'normal', wordWrap: 'break-word'};
  }

  render() {
    let now = Date.now();
    if (new Date(this.props.conference.dates.ending) < now) this.rowStyle.backgroundColor = deepOrange100;
    else if (new Date(this.props.conference.dates.deadline) < now) this.rowStyle.backgroundColor = amber100;
    else if (new Date(this.props.conference.dates.ending) <= now && new Date(this.props.conference.dates.starting) >= now) this.rowStyle.backgroundColor = lime200;

    return (
      <TableRow hoverable={true}>
        <TableRowColumn style={this.rowStyle}>
          {this.props.conference.short} {this.props.conference.number}
        </TableRowColumn>
        <TableRowColumn style={this.rowStyle}>
          <TimeWrapper value={this.props.conference.dates.deadline}/>
          <br/>
          <TimeWrapper value={this.props.conference.dates.deadline} relative />
        </TableRowColumn>
        <TableRowColumn style={this.rowStyle}>
          <TimeWrapper value={this.props.conference.dates.notification}/>
          <br/>
          <TimeWrapper value={this.props.conference.dates.notification} relative />
        </TableRowColumn>
        <TableRowColumn style={this.rowStyle}>
          <TimeWrapper value={this.props.conference.dates.starting}/>
          <br/>
          <TimeWrapper value={this.props.conference.dates.starting} relative />)
        </TableRowColumn>
        <TableRowColumn style={this.rowStyle}>
          <TimeWrapper value={this.props.conference.dates.ending}/>
          <br/>
          <TimeWrapper value={this.props.conference.dates.ending} relative />
        </TableRowColumn>
        <TableRowColumn style={this.rowStyle}>
          {this.props.conference.location.city}, {this.props.conference.location.country}
        </TableRowColumn>
        <TableRowColumn style={this.rowStyle}>
          <ExternalLink text={<HomeIcon color={blue500} hoverColor={red500} />} url={this.props.conference.urls.main} />
          <IconMenu
            iconButtonElement={<IconButton><LinkIcon color={blue500} hoverColor={red500} /></IconButton>}
          >
            <MenuItem primaryText="Home" leftIcon={<HomeIcon color={blue500} hoverColor={red500} />} onTouchTap={() => { window.open(this.props.conference.urls.main, "_blank"); }} />
            <MenuItem primaryText="Call for Papers" leftIcon={<AnnouncementIcon color={blue500} hoverColor={red500} />} onTouchTap={() => { window.open(this.props.conference.urls.cfp, "_blank"); }} />
            <MenuItem primaryText="Tracks" leftIcon={<TracksIcon color={blue500} hoverColor={red500} />} onTouchTap={() => { window.open(this.props.conference.urls.tracks, "_blank"); }} />
            <MenuItem primaryText="Important Dates" leftIcon={<ScheduleIcon color={blue500} hoverColor={red500} />} onTouchTap={() => { window.open(this.props.conference.urls.dates, "_blank"); }} />
            <MenuItem primaryText="Schedule" leftIcon={<ProgramIcon color={blue500} hoverColor={red500} />} onTouchTap={() => { window.open(this.props.conference.urls.schedule, "_blank"); }} />
            <MenuItem primaryText="Venue" leftIcon={<MapIcon color={blue500} hoverColor={red500} />} onTouchTap={() => { window.open(this.props.conference.location.venueUrl, "_blank"); }} />
          </IconMenu>
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default ConferenceTableLine;
