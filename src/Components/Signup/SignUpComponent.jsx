import React, { Component } from 'react';
import { Button, TextField, Link, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class SignUp extends Component {
    render() {
        const classes = { root: 'root', image: "img", paper: 'paper', avatar: 'avater' }
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
          >
        
            <Grid item xs={3} alignItems="center">
              <Typography component="h1" variant="h5" align="center">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="User name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end" direction="row">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Grid>   
          </Grid> 
            // <Grid container component="main" className='bgimg' alignItems="center" justifyContent="center">
            //     <Grid item xs={12} sm={6} md={5} p={2} component={Paper} elevation={2} square>
            //     <Box className='loginbox' pt={4} pb={4}>

            //     <Typography component="h1" variant="h5">
            //                 Sign in
            //     </Typography>
                        
            //         </Box>
            //     </Grid>

            //     <Grid item xs={false} sm={6} md={7}  alignItems="center" >
            //         <Box m={2} p={3} className='tre_bg'>
            //             <h2>The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.</h2>
            //             <p>The grid creates visual consistency between layouts while allowing flexibility across a wide variety of designs. Material Design’s responsive UI is based on a 12-column grid layout.</p>
            //             <h2>Auto-layout</h2>
            //             <p>The Auto-layout makes the items equitably share the available space. That also means you can set the width of one item and the others will automatically resize around it.</p>
            //         </Box>
            //     </Grid>
            // </Grid>
        );
    }
}
export default SignUp;