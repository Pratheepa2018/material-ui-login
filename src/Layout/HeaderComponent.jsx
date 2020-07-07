import React from 'react';
import {AppBar} from '@material-ui/core';
import 'react-notifications/lib/notifications.css';
import Auth from './Authentication';
import TopMenu from './TopMenu';
import './HeaderComponent.css';
import '../Styles/header.scss';

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
    if (auth) {
      this.setState({ isAuthenticated: auth });
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div>
        <AppBar position="fixed" >
          <TopMenu islogin={isAuthenticated} />
        </AppBar>
      </div>
    );
  }
}

export default (Header);