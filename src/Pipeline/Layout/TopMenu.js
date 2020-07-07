import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import { Button, Link } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { Language, FindReplace } from '@material-ui/icons/';
import Logout from '../Components/Authentication/LogoutComponent';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (

    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          Contact Us
      </Link>
      </MenuItem>

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          Resource Center
      </Link>
      </MenuItem>

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          About
      </Link>
      </MenuItem>

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          Call: 1800-827-2796
      </Link>
      </MenuItem>

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          Earth
      </Link>
      </MenuItem>

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          Refresh
      </Link>
      </MenuItem>

      <MenuItem>
        <Link href="#" onClick={preventDefault}>
          Login
      </Link>
      </MenuItem>
    </Menu>
  );

  

  return (
    <div className={classes.grow}>
      <div>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <img src="https://itservices.collabera.com/wp-content/uploads/2019/04/Logo.png" alt="logo" className={classes.logo} />
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button aria-label="show 4 new mails" color="inherit">
              Contact Us
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              Resource Center
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              About
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              Call: 1800-827-2796
            </Button>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Language />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <FindReplace />
            </IconButton>
            
            { props.islogin &&(
              <Logout />
           
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
