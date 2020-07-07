import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';

import { Checkbox, TextField, FormControlLabel, Fab, Grid, Box, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './DevopsTools.css';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    border: '#ccc 1px solid'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));

export default function AddDevopsTool() {
  const classes = useStyles();
  return (
    <div id="addNewProject">
      <FullWidthBanner
        title="Add Devops Tool"
        image="../../assets/images/globle.jpg"
        imageText="Full Banner"
        exceptimage="../../assets/images/learnmore.gif"
      />
      <Box marginY={5}>
        <Grid container spacing={3} direction="row" alignItems="center" justify="center">
          <Grid item xs={6}>
            <Box marginY={3} border={1} padding={2} borderColor="grey.500" boxShadow={3}>
              <Typography variant="subtitle1" className="bold">Add Devops Tool</Typography>
              <Box padding={3}>
                <ValidatorForm>
                  <Grid container spacing={3} direction="row" justify="space-between" alignItems="center" alignContent="center">
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Tool Title</Typography>
                      <TextValidator
                        type="text"
                        variant="outlined"
                        margin="normal"
                        required
                        id="projName"
                        label="Tool Title"
                        name="project_name"
                        size="small"
                        autoFocus
                        fullWidth
                        validators={['required', 'matchRegexp:^[A-Za-z]+']}
                        errorMessages={['This field is require', 'Enter proper name!']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Tool Category</Typography>
                      <FormControlLabel
                        value="CI"
                        control={<Checkbox color="primary" />}
                        label="CI"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="CD"
                        control={<Checkbox color="primary" />}
                        label="CD"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="Source Control"
                        control={<Checkbox color="primary" />}
                        label="Source Control"
                        labelPlacement="start"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Tool Logo/Image</Typography>

                      <Paper component="form" className={classes.root}>
                        <InputBase
                          className={classes.input}
                          placeholder="Upload Image"
                          inputProps={{ 'aria-label': 'Upload Image' }}
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          variant="outlined"
                          placeholder="Upload Image"
                        />

                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Tool Details</Typography>
                      <TextField
                        id="projDetails"
                        label="Tool Details"
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Tool Details"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        value="Is Active"
                        control={<Checkbox color="primary" />}
                        label="Is Active"
                        labelPlacement="start"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button type="clear" variant="contained" color="primary" fullWidth >Save</Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="outlined" color="primary" fullWidth href="/DevopsTools" >Cancel</Button>
                    </Grid>

                  </Grid>
                </ValidatorForm>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>


    </div >
  );
}
