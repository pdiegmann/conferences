import React, {Component} from 'react';
import {render} from 'react-dom';
import ConferenceTable from './ConferenceTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './Menu';
import Paper from 'material-ui/Paper';

import injectTapEventPlugin from 'react-tap-event-plugin';

const ALL = "ALL";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: {
        conference: [ALL],
        timeline: "UPCOMING",
        region: [ALL]
      },
      filteredData: []
    };
  }

  handleFilterChanged = (filter) => {
    this.updateData(this.state.data, filter);
  };

  updateData(data, filter) {
    let filteredData = data.filter((conference) => {
      if (!filter.conference.includes(ALL) && !filter.conference.includes(conference.short)) return false;

      if (!filter.region.includes(ALL) && !filter.region.includes(conference.location.region)) return false;

      let now = new Date().getTime();
      switch (filter.timeline) {
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
            if (conference.dates.deadline > lastDay || conference.dates.deadline < firstDay) return false;
          }
          break;

        default:
          return false;

        case ALL:
          break;
      }

      return true;
    });

    filteredData.sort((a, b) => {
      if (a.dates.starting > b.dates.starting) return 1;
      else if (a.dates.starting < b.dates.starting) return -1;

      if (a.dates.deadline > b.dates.deadline) return 1;
      else if (a.dates.deadline < b.dates.deadline) return -1;

      if (a.dates.short > b.dates.short) return 1;
      else if (a.dates.short < b.dates.short) return -1;
      else return 0;
    });

    console.log(filter);
    console.log(data);
    console.log(filteredData);

    this.setState({
      filter: filter,
      data: data,
      filteredData: filteredData
    });
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/pdiegmann/conferences/master/data/data.json")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Bad Response!");
        }

        return response.json();
      }).then((data) => {
        if (data) {
          this.updateData(data, this.state.filter);
        }
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <Menu filter={this.state.filter} onFilterChanged={this.handleFilterChanged} />
          <ConferenceTable conferences={this.state.filteredData} filter={this.state.filter} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
