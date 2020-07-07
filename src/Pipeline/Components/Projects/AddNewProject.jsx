import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FullWidthBanner from '../FullWidthBanner/FullWidthBanner';

import { Checkbox, TextField, FormControlLabel, TextareaAutosize, Grid, Box, Button } from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './Projects.css';

export default function AddNewProject() {
  return (
    <div id="addNewProject">
      <FullWidthBanner
        title="Add a New Project"
        image="../../assets/images/globle.jpg"
        imageText="Full Banner"
        exceptimage="../../assets/images/learnmore.gif"
      />
      <Box marginY={5}>
        <Grid container spacing={3} direction="row" alignItems="center" justify="center">
          <Grid item xs={6}>
            <Box marginY={3} border={1} padding={2} borderColor="grey.500" boxShadow={3}>
              <Typography variant="subtitle1" className="bold">Add New Project</Typography>
              <Box padding={3}>
                <ValidatorForm>
                  <Grid container spacing={3} direction="row" justify="space-between" alignItems="center" alignContent="center">
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Project Title</Typography>
                      <TextValidator
                        type="text"
                        variant="outlined"
                        margin="normal"
                        required
                        id="projName"
                        label="Project Title"
                        name="project_name"
                        size="small"
                        autoFocus
                        fullWidth
                        validators={['required', 'matchRegexp:^[A-Za-z]+']}
                        errorMessages={['This field is require', 'Enter proper name!']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Project Details</Typography>
                      <TextField
                        id="projDetails"
                        label="Project Details"
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Project Details"
                       /></Grid>

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
                      <Button variant="outlined" color="primary" fullWidth href="/Projects" >Cancel</Button>
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
