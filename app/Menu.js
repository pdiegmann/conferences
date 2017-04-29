import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MapIcon from 'material-ui/svg-icons/maps/map';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AddDialog from './AddDialog';

const ALL = "ALL";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: this.props.filter.conference,
      timeline: this.props.filter.timeline,
      region: this.props.filter.region,
      addDialogOpen: false
    };
  }

  handleConferenceChange = (event, index, value) => {
    if (!value || value.length <= 0 || (value.includes(ALL) && !this.state.conference.includes(ALL))) {
      value = [];
      value.push(ALL);
    } else if (value.includes(ALL)) {
      value.splice(value.indexOf(ALL), 1);
    }
    this.setState({conference: value}, () => {
      this.props.onFilterChanged(this.state);
    });
  };
  handleTimelineChange = (event, index, value) => this.setState({timeline: value}, () => {
    this.props.onFilterChanged(this.state);
  });
  handleRegionChange = (event, index, value) => {
    if (!value || value.length <= 0 || (value.includes(ALL) && !this.state.region.includes(ALL))) {
      value = [];
      value.push(ALL);
    } else if (value.includes(ALL)) {
      value.splice(value.indexOf(ALL), 1);
    }
    this.setState({region: value}, () => {
      this.props.onFilterChanged(this.state);
    });
  };

  handleAddDialogOpen = () => {
    this.setState({addDialogOpen: true});
  };

  handleAddDialogClose = () => {
    this.setState({addDialogOpen: false});
  };

  render() {
    return (
      <div>
        <AddDialog open={this.state.addDialogOpen} handleClose={this.handleAddDialogClose} />
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle style={{marginLeft:20}} text="IS Conferences" />
          </ToolbarGroup>

          <ToolbarGroup lastChild={true}>
            <RaisedButton label="Something missing or wrong?"  onTouchTap={this.handleAddDialogOpen} />

            <DropDownMenu value={this.state.timeline} onChange={this.handleTimelineChange}>
              <MenuItem value={ALL} primaryText="All" />
              <MenuItem value={"UPCOMING"} primaryText="All Upcoming" />
              <MenuItem value={"PAST"} primaryText="All Past" />
              <MenuItem value={"THIS_YEAR"} primaryText="This Year" />
              <MenuItem value={"LAST_YEAR"} primaryText="Last Year" />
              <MenuItem value={"DEADLINE_UPCOMING"} primaryText="All Upcoming Deadlines" />
              <MenuItem value={"DEADLINE_THIS_YEAR"} primaryText="Deadline This Year" />
            </DropDownMenu>

            <DropDownMenu value={this.state.conference} multiple={true} onChange={this.handleConferenceChange}>
              <MenuItem value={ALL} primaryText="All Conferences" />
              <MenuItem value={"AMCIS"} primaryText="AMCIS" />
              <MenuItem value={"ECIS"} primaryText="ECIS" />
              <MenuItem value={"HICSS"} primaryText="HICSS" />
              <MenuItem value={"ICIS"} primaryText="ICIS" />
              <MenuItem value={"PACIS"} primaryText="PACIS" />
            </DropDownMenu>

            <DropDownMenu value={this.state.region} multiple={true} onChange={this.handleRegionChange}>
              <MenuItem value={ALL} primaryText="All Regions" />
              <MenuItem value={1} primaryText="Region 1" />
              <MenuItem value={2} primaryText="Region 2" />
              <MenuItem value={3} primaryText="Region 3" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default Menu;
