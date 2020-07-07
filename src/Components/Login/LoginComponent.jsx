import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Button, LinearProgress, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { NotificationManager } from 'react-notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Auth from '../../Layout/Authentication';
import './LoginComponent.css'

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      submitting: false,
      formError: '',
      showPassword: false
    }
  }
  handleChanges = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  handleSignIn = async () => {
    this.setState({ submitting: true })
    const values = {
      LoginName: this.state.userName,
      password: this.state.password
    }
    try {
      await fetch(`https://cdplogin.azurewebsites.net/login`, {
        method: 'POST',
        crossDomain: true,
        compress: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(values),
      }).then(resp => resp.json())
        .then(data => {
          this.setState({ submitting: false })
          if (data.status === 'Success') {
            Auth.setToken(data);
            window.location.reload(false);
          } else {
            this.setState({ formError: data.message })
            return NotificationManager.warning(data.message);
          }
        })
    } catch (e) {
      this.setState({ formError: "Something went wrong." })
      return {
        responseStatus: false,
        responseMessage: "Something went wrong."
      };
    }
  }

  render() {
    const classes = { root: 'root', image: "img", paper: 'paper' }
    const { userName, password, submitting, showPassword } = this.state;


    const handleClickShowPassword = () => {
      this.setState({ showPassword: !showPassword });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    return (
      <Grid container component="main" className='bgimg' alignItems="center" justifyContent="right" justify="flex-end">

        <Grid item xs={12} sm={12} md={5} p={2} elevation={2} square >
          <Box className='loginbox' padding={4} marginLeft={5} marginRight={5} marginTop={8} marginBottom={8} component={Paper}>
            <Typography component="h1" variant="h5">Sign in</Typography>
            <ValidatorForm ref="form"
              onSubmit={this.handleSignIn}
              onError={errors => console.log(errors)}
              className={classes.form} >
              {this.state.formError && (
                <Alert severity="error">{this.state.formError}</Alert>
              )
              }

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                onChange={this.handleChanges}
                autoFocus
                value={userName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={this.handleChanges}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
              > {
                  !submitting ? 'Sign In' : 'Submitting'
                }
              </Button>
              <Box paddingTop={1} paddingBottom={1}>
                {!submitting ? " " : <LinearProgress />}
              </Box>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">Forgot password?</Link>
                </Grid>
              </Grid> */}
            </ValidatorForm>
          </Box>
        </Grid>

      </Grid>
    );
  }
}