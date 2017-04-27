import React, {Component} from 'react';
import {render} from 'react-dom';
import ConferenceTable from './ConferenceTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './Menu';
import Paper from 'material-ui/Paper';

import injectTapEventPlugin from 'react-tap-event-plugin';

import data from '../data/data.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        conference: "ALL",
        timeline: "UPCOMING",
        region: "ALL"
      }
    };
  }

  handleFilterChanged = (filter) => this.setState({filter: filter});

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    let filteredData = data.filter((conference) => {
      if (this.state.filter.conference !== "ALL" && this.state.filter.conference !== conference.short) return false;

      if (this.state.filter.region !== "ALL" && this.state.filter.region !== conference.location.region) return false;

      let now = new Date().getTime();
      switch (this.state.filter.timeline) {
        case "UPCOMING":
          if (conference.dates.starting < now) return false;
          break;

        case "PAST":
          if (conference.dates.starting >= now) return false;
          break;

        case "THIS_YEAR": {
            let thisYear = new Date().getFullYear();
            let firstDay = new Date(thisYear, 0, 1).getTime();
            let lastDay = new Date(thisYear, 11, 31).getTime();
            if (conference.dates.starting > lastDay || conference.dates.ending < firstDay) return false;
          }
          break;

        case "LAST_YEAR": {
            let lastYear = new Date().getFullYear() - 1;
            let firstDay = new Date(lastYear, 0, 1).getTime();
            let lastDay = new Date(lastYear, 11, 31).getTime();
            if (conference.dates.starting > lastDay || conference.dates.ending < firstDay) return false;
          }
          break;

        case "DEADLINE_UPCOMING":
          if (conference.dates.deadline < now) return false;
          break;

        case "DEADLINE_THIS_YEAR": {
            let thisYear = new Date().getFullYear();
            let firstDay = new Date(thisYear, 0, 1).getTime();
            let lastDay = new Date(thisYear, 11, 31).getTime();
            if (conference.dates.starting > lastDay || conference.dates.ending < firstDay) return false;
          }
          break;

        default:
          return false;

        case "ALL":
          break;
      }

      return true;
    });

    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <Menu onFilterChanged={this.handleFilterChanged} />
          <ConferenceTable conferences={filteredData} filter={this.state.filter} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
