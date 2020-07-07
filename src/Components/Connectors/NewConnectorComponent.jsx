import React, { Component } from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { common } from '../../Utils/Api.env';
import { NotificationManager } from 'react-notifications';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import '../../Styles/validation.css';
import { PageLoader } from '../../Layout/Loader';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';
import Auth from '../../Layout/Authentication';

export default class NewConnector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connector_name: '',
      connector_desc: '',
      connector_type: '',
      tenant_id: '',
      server_address: '',
      server_port: '',
      clientdb: '',
      dbuser: '',
      dbpassword: '',
      editConnector: false,
      connectorId: -1,
      loadEditDetails: false,
      testConnection: false,
      metaDataConnection: false,
      saveConnector: false
    }
    this.baseState = this.state;
  }
  handleChanges = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  createDataObject = () => {
    const { connector_name, connector_desc, tenant_id, connector_type, server_address, server_port, clientdb, dbuser, dbpassword } = this.state;
    const fields = {
      "connector_name": connector_name,
      "connector_desc": connector_desc,
      "connector_type": connector_type,
      "tenant_id": tenant_id,
      "server_address": server_address,
      "server_port": server_port,
      "clientdb": clientdb,
      "dbuser": dbuser,
      "dbpassword": dbpassword
    }
    return fields;
  }

  handleClear = () => {
    this.setState(this.baseState);
  }

  handleUpdate = async () => {
    const saveConnectorURL = `${common.api_url}/connector`;
    const { connectorId, connector_name, connector_desc, connector_type, tenant_id, server_address, server_port, clientdb, dbuser, dbpassword } = this.state;
    const fields = {
      "connectorId": connectorId,
      "connector_name": connector_name,
      "connector_desc": connector_desc,
      "connector_type": connector_type,
      "tenant_id": tenant_id,
      "server_address": server_address,
      "server_port": server_port,
      "clientdb": clientdb,
      "dbuser": dbuser,
      "dbpassword": dbpassword
    }
    try {
      await fetch(saveConnectorURL, {
        method: 'PUT',
        crossDomain: true,
        compress: true,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(fields),
      }).then(resp => resp.json())
      .then(data => {
        if(data.status === 'Success') {
          NotificationManager.success(data.message);
          this.props.history.push('/dashboard/CDP/cdp-connector-profile/connectors');
        }
      })
    } catch (e) {
      console.log(e, 'Something went wrong');
    }
  }
  generateTestData = () => {
    const { server_address, server_port, clientdb, dbuser, dbpassword } = this.state;
    const data = {
      'server_address': server_address,
      'server_port': server_port,
      'clientdb': clientdb,
      'dbuser': dbuser,
      'dbpassword': dbpassword
    }
    return data;
  }

  handleTestConnection = async () => {
    const testURL = "https://cdpmysqlconnector.azurewebsites.net/mysql/testConnection";
    this.setState({testConnection: true});
    console.log(this.generateTestData());
    try {
      await fetch(testURL, {
        method: 'POST',
        crossDomain: true,
        compress: true,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.generateTestData())
      }).then(resp => resp.json())
        .then(response => {
          this.setState({testConnection: false});
          if (response === 'failure') {
            return false;
          } else if (response === 'success') {
            return true;
          }
        })
    } catch (e) {
      this.setState({testConnection: false});
      NotificationManager.error('Error! Check the fields');
      return false;
    }

  }

  handleMetadata = async () => {
    const metaURL = 'https://cdpmysqlconnector.azurewebsites.net/mysql/getMetaData';
    this.setState({metaDataConnection: true});
    console.log(this.generateTestData());
    try {
      await fetch(metaURL, {
        method: 'POST',
        crossDomain: true,
        compress: true,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.generateTestData())
      }).then(resp => resp.json())
        .then(response => {
          this.setState({metaDataConnection: false})
          console.log(response);
          console.log(JSON.parse(response));
          // if(response === 'failure') {
          //   return false;
          // } else if (response === 'success') {
          //   return true;
          // }
        })
    } catch (e) {
      this.setState({metaDataConnection: false});
      NotificationManager.error('Error! Check the fields');
      return false;
    }
  }

  handelSave = async () => {
    this.setState({saveConnector: true});
    const searchKey = window.location.search;
    let getKey;
    if (searchKey.length > 0) {
      getKey = window.location.search.split('?')[1].split('=')[0];
    }
    if (getKey === 'edit') {
      this.handleUpdate();
    } else {
      if (this.handleTestConnection()) {

        NotificationManager.success('Connection Varified Successfully!');
        const saveConnectorURL = `${common.api_url}/connector`;
        try {
          await fetch(saveConnectorURL, {
            method: 'POST',
            crossDomain: true,
            compress: true,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(this.createDataObject()),
          }).then(resp => resp.json())
            .then((data) => {
              this.setState({saveConnector: false});
              if (data.status === 'Success') {
                NotificationManager.success('Connection Saved Successfully!');
                this.props.history.push('/dashboard/CDP/cdp-connector-profile/connectors');
              } else {
                console.log('Something went wrong!');
              }
            })
        } catch (e) {
          this.setState({saveConnector: false});
          console.log(e, 'Oh no something went wrong!!!');
        }
      } else {
        this.setState({saveConnector: false});
        NotificationManager.error('Connection Failed');
      }
    }
  }
  componentDidMount() {
    this.setState({ tenant_id: Auth.getTenentID() });
    const searchKey = window.location.search;
    if (searchKey.length > 0) {
      const getKey = window.location.search.split('?')[1].split('=')[0];
      if (getKey === 'edit') {
        this.setState({ editConnector: true, loadEditDetails: true })
        const id = window.location.search.split('?')[1].split('=')[1]
        const connectorId = parseInt(id);
        this.setState({ connectorId: connectorId })
        const ConnectorsURL = `${common.api_url}/connector?tenant_Id=1&connectorId=${connectorId}`
        console.log(ConnectorsURL);
        fetch(ConnectorsURL, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }).then(resp => resp.json())
          .then((data) => {
            Object.keys(data).map(element => {
              const flag = Object.keys(data[element][0])
              flag.map(item => {

                this.setState({ [item]: data[element][0][item], loadEditDetails: false });
                return false;
              })
              return false;
            })
            return false;
          });
      }
    }
  }

  render() {
    const { connector_name, connector_desc, connector_type, server_address, server_port, clientdb, dbuser, dbpassword, editConnector, loadEditDetails, testConnection, metaDataConnection, saveConnector} = this.state;
    const buttonStyle = {
      fontSize: '12px',
      textTransform: 'capitalize'
    }
    return (
      <div className="new-connector">
        <FullWidthBanner
          title="New Connector"
          image="../../../../assets/images/globle.jpg"
          imageText="Full Banner"
          exceptimage ="../../../../assets/images/learnmore.gif"
        />
        <Box marginY={5}>
          <Grid container spacing={3} direction="row" alignItems="center" justify="center">
            <Grid item xs={8}>
              <Box marginY={3} border={1} padding={2} borderColor="grey.500" boxShadow={3}>
                <Typography variant="subtitle1">Data Source Connector</Typography>
                <Box padding={3}>
                  {!loadEditDetails ?
                    <ValidatorForm
                      onSubmit={this.handelSave}
                    >
                      <Grid container spacing={3} direction="row" justify="space-between" alignItems="center" alignContent="center">
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                            id="connectorName"
                            label="Connector Name"
                            name="connector_name"
                            size="small"
                            autoFocus
                            fullWidth
                            value={connector_name}
                            validators={['required', 'matchRegexp:^[A-Za-z]+']}
                            errorMessages={['This field is require', 'Enter proper name!']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            required
                            variant="outlined"
                            margin="normal"
                            id="connector_desc"
                            label="Connector Desc"
                            name="connector_desc"
                            autoFocus
                            fullWidth
                            size="small"
                            value={connector_desc}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                            id="connectorType"
                            label="Connector Type"
                            name="connector_type"
                            size="small"
                            autoFocus
                            fullWidth
                            value={connector_type}
                            validators={['required', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['This field is required', 'Only integers are allowed']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                            id="clientDb"
                            label="Client DB"
                            name="clientdb"
                            size="small"
                            autoFocus
                            fullWidth
                            value={clientdb}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                            id="serverAddress"
                            label="Server Address"
                            name="server_address"
                            size="small"
                            autoFocus
                            fullWidth
                            value={server_address}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                            id="serverPort"
                            label="Server Port"
                            name="server_port"
                            size="small"
                            autoFocus
                            fullWidth
                            value={server_port}
                            validators={['required', 'matchRegexp:^[0-9]*$']}
                            errorMessages={['This field is required', 'Only integers are allowed']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="text"
                            variant="outlined"
                            margin="normal"
                            required
                            id="dbUserName"
                            label="DB User Name"
                            name="dbuser"
                            size="small"
                            autoFocus
                            fullWidth
                            value={dbuser}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            onChange={this.handleChanges}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextValidator
                            type="password"
                            variant="outlined"
                            margin="normal"
                            required
                            id="dbPassword"
                            label="DB Password"
                            name="dbpassword"
                            size="small"
                            autoFocus
                            fullWidth
                            value={dbpassword}
                            onChange={this.handleChanges}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            inputProps={{
                              form: {
                                autocomplete: 'off',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button type="clear" variant="outlined" color="primary" fullWidth style={buttonStyle} onClick={this.handleClear}>Clear All</Button>
                        </Grid>
                        <Grid item xs={3} className={`${testConnection ? 'section-loader': ''}`}>
                          { !testConnection ? 
                            <Button type="button" variant="contained" color="primary" fullWidth style={buttonStyle} onClick={this.handleTestConnection}>Test Connection</Button>
                            :
                            <PageLoader />
                          }
                        </Grid>
                        <Grid item xs={3} className={`${metaDataConnection ? 'section-loader': ''}`}>
                          { !metaDataConnection ?
                            <Button type="button" variant="contained" color="primary" fullWidth style={buttonStyle} onClick={this.handleMetadata}>View Meta Data</Button>
                            :
                            <PageLoader />
                          }
                        </Grid>
                        <Grid item xs={3} className={`${saveConnector ? 'section-loader': ''}`}>
                          { !saveConnector ? 
                            <Button type="submit" variant="contained" color="primary" fullWidth style={buttonStyle}>
                              {!editConnector ?
                                `Save Connector`
                                :
                                `Update Connector`
                              }
                            </Button>
                          :
                            <PageLoader />
                          }

                        </Grid>
                      </Grid>
                    </ValidatorForm>
                    : <div className="page-loader"><PageLoader /></div>}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  }
}