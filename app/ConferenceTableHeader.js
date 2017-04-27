import React, {Component} from 'react';
import {render} from 'react-dom';
import ExternalLink from './ExternalLink';
import {TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

class ConferenceTableHeader extends Component {
  render() {
    return (
        <TableRow hoverable={true}>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Deadline</TableHeaderColumn>
          <TableHeaderColumn>Starting</TableHeaderColumn>
          <TableHeaderColumn>Ending</TableHeaderColumn>
          <TableHeaderColumn>Location</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
    );
  }
}

export default ConferenceTableHeader;
