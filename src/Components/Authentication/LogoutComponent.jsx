import React from 'react';
import { IconButton} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Logout() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload(false)
  }
  return(
    <IconButton onClick={handleLogout} className="logoutBtn" color="inherit">
      <ExitToAppIcon />
    </IconButton>
  )
}