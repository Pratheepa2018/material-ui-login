import React from 'react';
import { AppBar,Toolbar, IconButton, Button, Tabs, Tab } from '@material-ui/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Breadcrumbs from './BreadCrumbs';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#4169e1',
  },
  logo: {
    maxWidth: 160,
  },
});
class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (<AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton href='/' aria-label="Collabera Logo" >
          <img src="https://itservices.collabera.com/wp-content/uploads/2019/04/Logo.png" alt="logo" className={classes.logo} />
        </IconButton>
        <div className={classes.grow} />
        <Button color="inherit" href="/signup">Signup</Button>                                   
      </Toolbar>
      <Tabs>
        <Tab color="inherit" label="Home" />
        <Tab color="inherit" label="Solutions" />
        <Tab color="inherit" label="Support" />
        <Tab color="inherit" label="Devlopers" />
        <Tab color="inherit" label="About" />
        <Tab color="inherit" label="Contact us" />
      </Tabs>
      <Breadcrumbs />
    </AppBar>

    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
