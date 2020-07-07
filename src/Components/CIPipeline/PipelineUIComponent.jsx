import React, { Component } from 'react';
import { Grid, Typography, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import '../../Styles/validation.css';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';
import Auth from '../../Layout/Authentication';

export default class NewConnector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      browserName: '',
      frameworkType: '',
      reportName: '',
      operatingSystem: '',
      executeFor: '',
      userName: '',
    }
  }
  handleChanges = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handelSave = async () => {

    const fieldsToSend = {
      browserName: this.state.browserName,
      frameworkType: this.state.frameworkType,
      reportName: this.state.reportName,
      operatingSystem: this.state.operatingSystem,
      executeFor: this.state.executeFor,
      userName: this.state.userName
    }
    const fieldsToSenda = JSON.stringify(fieldsToSend)

    alert(fieldsToSenda);

  }
  componentDidMount() {
    this.setState({ userName: Auth.getUserName() });

  }

  render() {
    const { browserName, frameworkType, reportName, operatingSystem, executeFor, userName } = this.state;

    const browserNames = [
      'Firefox',
      'Google Chrome',
      'Internet Explorer',
      'Safari',
      'Opera',
      'Phantomjs',
      'Edge',
      'HtmlUnit'
    ];

    const frameworkTypes = [
      'testng',
      'cucumber'
    ];

    const operatingSystems = [
      'windows',
      'linux',
      'mac'
    ];

    const executeTypes = [
      'api',
      'ui'
    ];

    return (
      <div >
        <FullWidthBanner
          title="Pipeline "
          image="../../../../assets/images/globle.jpg"
          imageText="Full Banner"
          exceptimage="../../../../assets/images/learnmore.gif"
        />
        <Box marginY={5}>
          <Grid container spacing={3} direction="row" alignItems="center" justify="center">
            <Grid item xs={8}>
              <Box marginY={3} border={1} padding={2} borderColor="grey.500" boxShadow={3}>
                <Typography variant="subtitle1">API/UI Pipeline</Typography>
                <Box padding={3}>

                  <ValidatorForm
                    onSubmit={this.handelSave}
                  >
                    <Grid container spacing={3} direction="row" justify="space-between" alignItems="center" alignContent="center">

                      <Grid item xs={6}>
                        <FormControl variant="outlined" >
                          <InputLabel id="demo-simple-select-outlined-label">Browser Name</InputLabel>
                          <Select style={{ width: 300 }}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={browserName}
                            onChange={this.handleChanges}
                            fullWidth
                            label="browserName"
                            size="small"
                            name="browserName"
                            required
                          >
                            {browserNames.map((name) => (
                              <MenuItem key={name} value={name} >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                      <FormControl variant="outlined" >
                        <InputLabel id="demo-simple-select-outlined-label">Framework Type</InputLabel>
                        <Select style={{ width: 300 }}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={frameworkType}
                          onChange={this.handleChanges}
                          fullWidth
                          label="frameworkType"
                          size="small"
                          name="frameworkType"
                          required
                        >
                          {frameworkTypes.map((name) => (
                            <MenuItem key={name} value={name} >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <TextValidator style={{ width: 300 }}
                          type="text"
                          variant="outlined" 
                          required
                          id="reportName"
                          label="Report Name"
                          name="reportName"
                          value={reportName}
                          onChange={this.handleChanges}
                        />
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl variant="outlined" >
                        <InputLabel id="operatingSystem">Operating System</InputLabel>
                        <Select style={{ width: 300 }}
                          margin="normal"
                          required
                          id="operatingSystem"
                          fullWidth
                          labelId="operatingSystem"
                          name="operatingSystem"
                          value={operatingSystem}
                          onChange={this.handleChanges}
                        >
                          {operatingSystems.map((name) => (
                            <MenuItem key={name} value={name} >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl variant="outlined" >
                        <InputLabel id="executeFor">Execute For</InputLabel>
                        <Select style={{ width: 300 }}
                          margin="normal"
                          required
                          id="executeFor"
                          fullWidth
                          labelId="executeFor"
                          name="executeFor"
                          value={executeFor}
                          onChange={this.handleChanges}
                        >
                          {executeTypes.map((name) => (
                            <MenuItem key={name} value={name} >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <TextValidator style={{ width: 300 }}
                          type="text"
                          disabled
                          margin="normal"
                          required
                          id="userName"
                          label="User Name"
                          name="userName"
                          variant="outlined" 
                          value={userName}
                        />
                      </Grid>

                      <Grid container spacing={1} justify="center" alignItems="center" className='profilegrid'>
                        <Grid>
                          <Box padding={1}>
                            <Button type="submit" variant="contained" color="primary">Automate</Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ValidatorForm>

                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  }
}