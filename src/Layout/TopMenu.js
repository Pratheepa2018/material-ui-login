import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Language } from '@material-ui/icons/';
import SearchIcon from '@material-ui/icons/Search';
import Logout from '../Components/Authentication/LogoutComponent';
import { NotificationContainer } from 'react-notifications';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <NotificationContainer />
      <div>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <img src="https://itservices.collabera.com/wp-content/uploads/2019/04/Logo.png" alt="logo" className={classes.logo} />
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button aria-label="show 4 new mails" color="inherit">
              Resource Center
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              Call: 1800-827-2796
            </Button>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Language />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <SearchIcon />
            </IconButton>

            {props.islogin && (
              <Logout />

            )}
          </div>
          <div className={classes.sectionMobile}>
            {props.islogin && (
              <Logout />
            )}
          </div>
        </Toolbar>
      </div>
    </div>
  );
}
