import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const shortSecondItemStyle = {
  marginLeft: 8,
  width: 115
}

const secondItemStyle = {
  marginLeft: 8
}

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.conference) {
      this.state = conference;
      // TODO: timestamps to date / time components
    } else {
      this.state = {
        name: null,
        short: null,
        number: null,
        location: {
          country: null,
          city: null,
          venueUrl: null,
          region: null
        },
        dates: {
          deadline: {
            date: null,
            time: null
          },
          starting: {
            date: null,
            time: null
          },
          ending: {
            date: null,
            time: null
          }
        },
        urls: {
          main: null,
          cfp: null,
          schedule: null,
          tracks: null,
          dates: null
        }
      };
    }
  }

  combineDateAndTime(date, time) {
    let combined = new Date();
    combined.setUTCFullYear(date.getFullYear());
    combined.setUTCMonth(date.getMonth());
    combined.setUTCDate(date.getDate());
    combined.setUTCHours(time.getHours());
    combined.setUTCMinutes(time.getMinutes());
    combined.setUTCSeconds(0);
    combined.setMilliseconds(0);
    return combined;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          let conference = JSON.parse(JSON.stringify(this.state));
          if (conference.dates.deadline.date && conference.dates.deadline.time) {
            conference.dates.deadline = this.combineDateAndTime(conference.dates.deadline.date, conference.dates.deadline.time).getTime();
          } else {
            conference.dates.deadline = null;
          }
          if (conference.dates.starting.date && conference.dates.starting.time) {
            conference.dates.starting = this.combineDateAndTime(conference.dates.starting.date, conference.dates.starting.time).getTime();
          } else {
            conference.dates.starting = null;
          }
          if (conference.dates.ending.date && conference.dates.ending.time) {
            conference.dates.ending = this.combineDateAndTime(conference.dates.ending.date, conference.dates.ending.time).getTime();
          } else {
            conference.dates.ending = null;
          }

          window.open("https://github.com/pdiegmann/conferences/issues/new?labels=enhancement&title=Change%20Request:%20" + encodeURIComponent(conference.name + " " + conference.number + " (" + conference.short + " " + conference.number + ")") + "&assignee=pdiegmann&body=```javascript%0A" + encodeURIComponent(JSON.stringify(conference, null, 2)) + "%0A```", "_blank")
          this.props.handleClose();
        }}
      />,
    ];

    return (
      <Dialog
        title="Is something missing or wrong?"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
      >
        <p>
          This form helps you and me to generate the configuration needed for any conference. Just fill out the form and the configuration will be genereated for you. Then, just click submit and you will be able to open a new issue where you can provide me with the new configuration.
        </p>
        <hr/>
        <form>
          <TextField
            style={{width:375}}
            onChange={(event, value) => { this.setState({name: value}); }}
            floatingLabelText="Full Conference Name"
          /><TextField
            floatingLabelText="Short Name"
            onChange={(event, value) => { this.setState({short: value}); }}
            style={shortSecondItemStyle}
          /><TextField
            floatingLabelText="Number / Year"
            onChange={(event, value) => { this.setState({number: value}); }}
            style={shortSecondItemStyle}
          />
          <br />
          <table cellPadding={0} style={{margin: 0}}>
            <tbody>
              <tr>
                <td>
                  <DatePicker
                    autoOk={true}
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, deadline: { ...this.state.dates.deadline, date: value}}}) }}
                    maxDate={this.state.dates.starting.date}
                    hintText="Submission Deadline"
                    mode="landscape"
                    textFieldStyle={{width:160, display: "inline-block"}} />
                </td>
                <td>
                  <TimePicker
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, deadline: { ...this.state.dates.deadline, time: value}}}) }}
                    hintText="Time"
                    format="24hr"
                    pedantic={true}
                    autoOk={true}
                    textFieldStyle={{width:100, display: "inline-block"}}
                  />
                </td>
                <td></td>
                <td>
                  <DatePicker
                    autoOk={true}
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, notification: { ...this.state.dates.notification, date: value}}}) }}
                    maxDate={this.state.dates.starting.date}
                    hintText="Notification"
                    mode="landscape"
                    textFieldStyle={{width:160, display: "inline-block"}} />
                </td>
                <td>
                  <TimePicker
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, notification: { ...this.state.dates.notification, time: value}}}) }}
                    hintText="Time"
                    format="24hr"
                    pedantic={true}
                    autoOk={true}
                    textFieldStyle={{width:100, display: "inline-block"}}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <DatePicker
                    autoOk={true}
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, starting: { ...this.state.dates.starting, date: value}}}) }}
                    hintText="Conference Start"
                    mode="landscape"
                    minDate={this.state.dates.deadline.date}
                    maxDate={this.state.dates.ending.date}
                    textFieldStyle={{width:160, display: "inline-block"}} />
                </td>
                <td>
                  <TimePicker
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, starting: { ...this.state.dates.starting, time: value}}}) }}
                    hintText="Time"
                    format="24hr"
                    pedantic={true}
                    autoOk={true}
                    textFieldStyle={{width:100, display: "inline-block"}}
                  />
                </td>
                <td>
                  <div style={{width:25}}></div>
                </td>
                <td>
                  <DatePicker
                    autoOk={true}
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, ending: { ...this.state.dates.ending, date: value}}}) }}
                    hintText="Conference End"
                    mode="landscape"
                    minDate={this.state.dates.starting.date || this.state.dates.deadline.date}
                    textFieldStyle={{width:160, display: "inline-block"}} />
                </td>
                <td>
                  <TimePicker
                    onChange={(event, value) => { this.setState({dates: { ...this.state.dates, ending: { ...this.state.dates.ending, time: value}}}) }}
                    hintText="Time"
                    format="24hr"
                    pedantic={true}
                    autoOk={true}
                    textFieldStyle={{width:100, display: "inline-block"}}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <SelectField
            floatingLabelText="Region"
            value={this.state.location.region}
            onChange={(event, index, value) => { this.setState({location: { ...this.state.location, region: value}}); }}>
            <MenuItem value={1} primaryText="1: Americas" />
            <MenuItem value={2} primaryText="2: Europe, Africa, the Middle East" />
            <MenuItem value={3} primaryText="3: Asia, Pacific" />
          </SelectField>
          <br/>
          <TextField
            floatingLabelText="Country"
            onChange={(event, value) => { this.setState({location: {...this.state.location, country: value}}); }}
          /><TextField
            floatingLabelText="City"
            onChange={(event, value) => { this.setState({location: {...this.state.location, city: value}}); }}
            style={secondItemStyle}
          />
          <br/>
          <TextField
            fullWidth={true}
            floatingLabelText="Landing Page URL"
            onChange={(event, value) => { this.setState({urls: {...this.state.urls, main: value}}); }}/>
          <br/>
          <TextField
            fullWidth={true}
            floatingLabelText="Call for Papers URL"
            onChange={(event, value) => { this.setState({urls: {...this.state.urls, cfp: value}}); }}/>
          <br/>
          <TextField
            floatingLabelText="Important Dates URL"
            onChange={(event, value) => { this.setState({urls: {...this.state.urls, dates: value}}); }}/>
          <br/>
          <TextField
            floatingLabelText="Tracks URL"
            onChange={(event, value) => { this.setState({urls: {...this.state.urls, tracks: value}}); }}/>
          <br/>
          <TextField
            fullWidth={true}
            floatingLabelText="Venue URL"
            onChange={(event, value) => { this.setState({location: {...this.state.location, venueUrl: value}}); }}/>
          <br/>
          <TextField
            floatingLabelText="Schedule URL"
            fullWidth={true}
            onChange={(event, value) => { this.setState({urls: {...this.state.urls, schedule: value}}); }}/>
        </form>
      </Dialog>
    );
  }
}

export default AddDialog;
