import React, {Component} from 'react';
import {render} from 'react-dom';
import ConferenceTableLine from './ConferenceTableLine';
import ConferenceTableHeader from './ConferenceTableHeader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

class ConferenceTable extends Component {
  render() {
    let rows = [];

    this.props.conferences.forEach((conference) => {
      rows.push(<ConferenceTableLine key={conference.short + '#' + conference.number} conference={conference} />);
    });

    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <ConferenceTableHeader />
        </TableHeader>
        <TableBody>
            {rows}
        </TableBody>
      </Table>
    );
  }
}

export default ConferenceTable;
