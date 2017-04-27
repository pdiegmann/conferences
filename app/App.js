import React, {Component} from 'react';
import {render} from 'react-dom';
import ConferenceTable from './ConferenceTable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import data from './data.json'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ConferenceTable conferences={data} />
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
