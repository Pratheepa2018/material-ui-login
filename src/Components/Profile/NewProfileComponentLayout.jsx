import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';
import { NotificationManager } from 'react-notifications';

import { PageLoader } from '../../Layout/Loader';
import {
  Paper, Box, Grid, TextField, Tabs, FormControl, Tab, AppBar, Accordion,
  AccordionSummary, AccordionDetails, InputLabel, Select,
  MenuItem, Checkbox, Button, CardHeader
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { common } from '../../Utils/Api.env';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box padding={1} >
        {children}
      </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class NewProfileComponentLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      activeTab: 0,
      setTaget: '',
      sourceTableName: [],
      targetTableName: [],
      profileName: '',
      profileDescription: '',
      sourceConnectorsId: '',
      targetConnectorsId: '',
      source: '',
      editProfile: '',
      checkedItems: [],
      sourceTableEdit: [],
      connecterList: [],
      isEdit: false,
      connecterSelected: "",
      masterTable: [],
      saveConnector: false,
      profileId:'',
      isLoading: false
    })
  }
  handleChangeConnecter = (event) => {
    if (this.state.activeTab === 0) {
      this.setState({
        sourceConnectorsId: event.target.value,
        connecterSelected: event.target.value,
      });
    } else {
      this.setState({
        targetConnectorsId: event.target.value,
        connecterSelected: event.target.value,
      });
    }


  };

  handleChangeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeTab = (event, newValue) => {
    if (newValue === 0) {
      if (!this.state.sourceConnectorsId) {
        this.setState({
          activeTab: newValue, taget: !this.state.source,
          connecterSelected: this.state.targetConnectorsId,
          sourceConnectorsId: this.state.targetConnectorsId,
        });
      } else {
        this.setState({
          activeTab: newValue, taget: !this.state.source,
          connecterSelected: this.state.sourceConnectorsId,
        });
      }

    } else {
      if (!this.state.targetConnectorsId) {
        this.setState({
          activeTab: newValue, taget: !this.state.source,
          connecterSelected: this.state.sourceConnectorsId,
          targetConnectorsId: this.state.sourceConnectorsId,
        });
      } else {
        this.setState({
          activeTab: newValue, taget: !this.state.source,
          connecterSelected: this.state.targetConnectorsId,
        });
      }
    }

  };

  saveProfileDataFormate() {
    let sourceTable = Object.keys(this.state.sourceTableName).map((tableName) => {
      return {
        tableName: tableName,
        orderByColumn: "ID",
        columns: this.state.sourceTableName[tableName]
      }
    })

    let targetTable = Object.keys(this.state.targetTableName).map((tableName) => {
      return {
        tableName: tableName,
        orderByColumn: "ID",
        columns: this.state.targetTableName[tableName]
      }
    })

    const dataPostformat = {
      tenant_id: 1,
      profileName: this.state.profileName,
      profileDescription: this.state.profileDescription,
      source_connector_id: this.state.sourceConnectorsId,
      source_profile_data: { tables: sourceTable },
      target_connector_id: this.state.targetConnectorsId,
      target_profile_data: { tables: targetTable }
    }
    return dataPostformat;
  }
  handleSaveProfile = async () => {
    //alert(JSON.stringify(this.saveProfileDataFormate()))
    const profile_api_link = common.profile_url;
    this.setState({ saveConnector: true });

    try {
      await fetch(profile_api_link, {
        method: 'POST',
        crossDomain: true,
        compress: true,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.saveProfileDataFormate())
      }).then(resp => resp.json())
        .then(data => {
          this.setState({ saveConnector: false });
          if (data.status === 'Success') {
            NotificationManager.success('Connection Saved Successfully!');
            this.props.history.push('/dashboard/CDP/cdp-connector-profile/profiles');
          } else {
            console.log('Something went wrong!');
          }
        })
    } catch (e) {
      this.setState({ saveConnector: false });
      console.log('Error! Check the fields');
      return false;
    }

  }

  handleChangeCheckbox = (table, column, typedata) => event => {
    const checkedItems = { ...this.state[typedata] }
    if (event.target.checked) {
      if (!checkedItems[table]) {
        checkedItems[table] = [];
      }
      checkedItems[table].push(column);
    } else {
      checkedItems[table] = checkedItems[table].filter(item => {
        return item !== column
      })
    }
    console.log(checkedItems)
    this.setState({ [typedata]: checkedItems });
  };

   createConnectorlist = () =>{
    const searchKey = window.location.search;
    let getKey;
    let queryStringpass;
    if (searchKey.length > 0) {
      queryStringpass = window.location.search.split('?')[1].split('=');
      getKey = queryStringpass[0];
    }

    if (getKey === 'edit') {
      this.setState({ isEdit: true, profileId: queryStringpass[1] });
    }
    let GetConnectorstype = `${common.profile_url}/GetConnectors?tenant_Id=1`;

    try {
       fetch(GetConnectorstype, {
        method: 'GET',
        crossDomain: true,
        compress: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      }).then(resp => resp.json())
        .then(data => {

          this.setState({ connecterList: data.connectors, isLoading:false })
        })
    } catch (e) {
      return false;
    }
  }

   getMasterTablesDetails=()=>{
     this.setState({isLoading:true})
    let ProfileURL = `${common.profile_url}/GetTablesDetails`
    const queryString = {
      "server_address": "collaberamarketplace.mysql.database.azure.com",
      "server_port": "3306",
      "clientdb": "world",
      "dbuser": "cmpadmin@collaberamarketplace",
      "dbpassword": "collabera@123"
    };

    try {
        fetch(ProfileURL, {
        method: 'POST',
        crossDomain: true,
        compress: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(queryString),
      }).then(resp => resp.json())
        .then(data => { 
          const sourceTableName = { ...this.state.sourceTableName };
          const targetTableName = { ...this.state.targetTableName };
          data.tables.filter((table) => {
            sourceTableName[table.tableName] = [];
            targetTableName[table.tableName] = [];
            return 0;
          })

          this.setState({
            masterTable: data.tables,
            targetTableName,
            sourceTableName 
          })
          if (!this.state.isEdit) {
          this.createConnectorlist();
          }
          this.fetchEditProfileData();
        })
    } catch (e) {
      return false;
    }
  }

  fetchEditProfileData = () =>{
    if (this.state.isEdit) {
      const getProfileURL = `${common.profile_url}/?tenant_Id=1&profileId=${this.state.profileId}`
      try {
        fetch(getProfileURL, {
          method: 'GET',
          crossDomain: true,
          compress: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
        }).then(resp => resp.json())
          .then(data => {
            const updateData = data.profiledetails[0];
            const source_profile_data = JSON.parse(updateData.source_profile_data);
            const target_profile_data = JSON.parse(updateData.target_profile_data);
            const sourceTableName = { ...this.state.sourceTableName };
            const targetTableName = { ...this.state.targetTableName };
            source_profile_data.tables.filter((table) => {
              sourceTableName[table.tableName] = table.columns;
              return 0;
            })
            target_profile_data.tables.filter((table) => {
              targetTableName[table.tableName] = table.columns;
              return 0;
            })
            const connecterList= "";
            this.setState({
              profileId: updateData.profileId,
              tenant_id: updateData.tenant_id,
              profileName: updateData.profileName,
              profileDescription: updateData.profileDescription,
              sourceConnectorsId: updateData.source_connector_id,
              targetConnectorsId: updateData.target_connector_id,
              sourceTableName,
              targetTableName,
              isLoading: false
            })
          })
      } catch (e) {
        return false;
      }
    }
    else {
      console.log('new entry')
    }
  }

   componentDidMount() {
    this.getMasterTablesDetails();
  }

  render() {
    const {
      activeTab,
      sourceTableName,
      targetTableName,
      profileName,
      profileDescription,
      connecterList,
      isEdit,
      connecterSelected,
      masterTable,
      isLoading
    } = this.state

    return (
      <div className="profilepage">

        <FullWidthBanner
          title="Add New Profile"
          image="../../../../assets/images/globle.jpg"
          imageText="Full Banner"
          exceptimage="../../../../assets/images/learnmore.gif" />

        <AppBar position="static" color="default">
          <Tabs value={activeTab} onChange={this.handleChangeTab} aria-label="simple tabs example">
            <Tab label="Source" elevation={1} {...a11yProps(0)} />
            <Tab label="Target" elevation={1} {...a11yProps(1)} />

          </Tabs>
        </AppBar>
        <Grid container spacing={1}>
        { isLoading && <PageLoader />}
          <Grid item sm={6}>
            <Box padding={1}>

              <Paper variant='outlined' style={{ padding: "10px" }}>

                <FormControl variant="outlined" className="selectdrop">
                  <InputLabel id="demo-simple-select-outlined-label">Connecter</InputLabel>
                  <Select style={{ width: 300 }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={connecterSelected}
                    onChange={this.handleChangeConnecter}
                    fullWidth
                    label="Connecter"
                    name="connecterSelected"
                  >
                    {isEdit ?
                      <MenuItem key={1} value={connecterSelected}>
                        {connecterSelected}
                      </MenuItem>
                      :
                      connecterList.map((connecter) => (
                        <MenuItem key={connecter.connectorId} value={connecter.connectorId} >
                          {connecter.connector_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

              </Paper>
            </Box>
          </Grid>
          <Grid item sm={3}>
          </Grid>
          <Grid item sm={6}>
            <Box padding={1}>
              <Paper elevation={0} variant='outlined' style={{ padding: "10px" }}>
                <TextField label="Profile Name" variant="outlined" size="small" fullWidth
                  value={profileName} name='profileName' onChange={this.handleChangeInput} />

              </Paper>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box padding={1}>
              <Paper elevation={0} variant='outlined' style={{ padding: "10px" }}>
                <TextField label="Profile description" variant="outlined" size="small" fullWidth
                  value={profileDescription} name='profileDescription' onChange={this.handleChangeInput} />

              </Paper>
            </Box>
          </Grid>

        </Grid>
        <TabPanel hidden={activeTab === 1} value={activeTab} index={0} padding={1}>
          {masterTable.map((table, index) => {
            return (

              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  {/* <Typography className='tableHeading'>{table.tableName}</Typography> */}
                  <CardHeader avatar={
                    <Checkbox
                      inputProps={{ 'aria-label': 'all items selected' }}
                    />
                  }
                    title={table.tableName}
                    subheader={`${table.columns.length} Columns`}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup row>
                    {table.columns.map((column, i) => {
                      return (
                        <FormControlLabel key={i}
                          control={
                            <Checkbox
                              onChange={this.handleChangeCheckbox(table.tableName, column, "sourceTableName")}
                              name={column}
                              color="primary"
                              checked={sourceTableName[table.tableName].filter(item => item === column).length ? true : false}
                            />
                          }
                          label={column}
                        />
                      )
                    })}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            )
          })
          }

        </TabPanel>
        <TabPanel hidden={activeTab === 0} value={activeTab} index={1}>
          {masterTable.map((table, index) => {
            return (

              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  {/* <Typography className='tableHeading'>{table.tableName}</Typography> */}
                  <CardHeader avatar={
                    <Checkbox
                      inputProps={{ 'aria-label': 'all items selected' }}
                    />
                  }
                    title={table.tableName}
                    subheader={`${table.columns.length} Columns`}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup row>
                    {table.columns.map((column, i) => {
                      return (
                        <FormControlLabel key={i}
                          control={
                            <Checkbox
                              onChange={this.handleChangeCheckbox(table.tableName, column, "targetTableName")}
                              name={column}
                              color="primary"
                              checked={targetTableName[table.tableName].filter(item => item === column).length ? true : false}
                            />
                          }
                          label={column}
                        />
                      )
                    })}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            )
          })
          }
        </TabPanel>
        <Grid container spacing={1} justify="center" alignItems="center" className='profilegrid'>
          <Grid>
            <Box padding={1}>

              <Button
                variant="contained"
                border={1}
                color="primary"
                size="large"
                onClick={this.handleSaveProfile}
                className='buttonsave'
                startIcon={<SaveIcon />}>
                Save Profile
              </Button>
            </Box>
          </Grid>
        </Grid>

      </div>

    );
  }
}

export default NewProfileComponentLayout;
