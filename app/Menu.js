import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MapIcon from 'material-ui/svg-icons/maps/map';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: "ALL",
      timeline: "UPCOMING",
      region: "ALL"
    };
  }

  handleConferenceChange = (event, index, value) => this.setState({conference: value}, () => {
    this.props.onFilterChanged(this.state);
  });
  handleTimelineChange = (event, index, value) => this.setState({timeline: value}, () => {
    this.props.onFilterChanged(this.state);
  });
  handleRegionChange = (event, index, value) => this.setState({region: value}, () => {
    this.props.onFilterChanged(this.state);
  });

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle style={{marginLeft:20}} text="IS Conferences" />
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <DropDownMenu value={this.state.timeline} onChange={this.handleTimelineChange}>
            <MenuItem value={"ALL"} primaryText="All" />
            <MenuItem value={"UPCOMING"} primaryText="All Upcoming" />
            <MenuItem value={"PAST"} primaryText="All Past" />
            <MenuItem value={"THIS_YEAR"} primaryText="This Year" />
            <MenuItem value={"LAST_YEAR"} primaryText="Last Year" />
            <MenuItem value={"DEADLINE_UPCOMING"} primaryText="All Upcoming Deadlines" />
            <MenuItem value={"DEADLINE_THIS_YEAR"} primaryText="Deadline This Year" />
          </DropDownMenu>

          <DropDownMenu value={this.state.conference} onChange={this.handleConferenceChange}>
            <MenuItem value={"ALL"} primaryText="All Conferences" />
            <MenuItem value={"AMCIS"} primaryText="AMCIS" />
            <MenuItem value={"ECIS"} primaryText="ECIS" />
            <MenuItem value={"HICSS"} primaryText="HICSS" />
            <MenuItem value={"ICIS"} primaryText="ICIS" />
            <MenuItem value={"PACIS"} primaryText="PACIS" />
          </DropDownMenu>

          <DropDownMenu value={this.state.region} onChange={this.handleRegionChange}>
            <MenuItem value={"ALL"} primaryText="All Regions" />
            <MenuItem value={1} primaryText="Region 1" />
            <MenuItem value={2} primaryText="Region 2" />
            <MenuItem value={3} primaryText="Region 3" />
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Menu;
