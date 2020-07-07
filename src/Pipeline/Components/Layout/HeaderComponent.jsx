import React from 'react';
import {
  AppBar,
  Toolbar, Box,
  Popover, MenuItem, Link, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'react-notifications/lib/notifications.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Auth from './Authentication'; 
import TopMenu from './TopMenu';
import './HeaderComponent.css';
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fff',
  },
  appSubBar: {
    backgroundColor: '#fff',
    color:'#000', 
    textAlign: 'center',
  },
  logo: {
    maxWidth: 160,
  },
  headerMenu: {
      fontSize: 'larger',
    fontWeight: '600',
    color: 'darkblue',
    display: 'flex',
  },
  paddingTypo:{
    padding: '8px'
  }
});
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      isAuthenticated: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick(event) {
    event.stopPropagation();
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null
    });
  }
  componentWillMount() {
    const auth = Auth.isAuthenticated();
    if(auth) {
      this.setState({isAuthenticated: auth});
    }
  }
  // componentDidUpdate() {
  //   this.setState({isAuthenticated:  this.props.isAuthenticated})
  // }
  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.state;
    const open = Boolean(this.state.anchorEl);
    return (
    <div>
      
      <AppBar position="static" >
      <TopMenu islogin={isAuthenticated} />
      <Toolbar className={classes.appSubBar} >
       <Box className="menu_second">
        <Button  color="inherit" label="Solution" onClick={this.handleClick}>Solution</Button>
        
        <Button href ={'/insights'} color="inherit" label="Insights">Insights</Button>
        
       <Button href ={'/client-support'} color="inherit" label="Client Support" >Client Support</Button>
        
        <Button href ={'/devlopers'} color="inherit" label="Devlopers" >Devlopers</Button>
       
      <Popover
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem>
            Collabera Information Platform (CIP)
          </MenuItem>
          <MenuItem >
          <Link href="/collaberadevopsplatform" >
          Collabera DevOps Platform (CDP) <ArrowRightIcon />
          </Link>
          </MenuItem>
          <MenuItem >
            Collabera Connectors MarketPlace (CCM)
          </MenuItem>
          <MenuItem >
            Collabera Cloud Accelerators (CCA)
          </MenuItem>
        </Popover>
        </Box>
      </Toolbar>
    </AppBar>
    
    </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);